
"use strict";

/**
 * input node merge-ts-files dir-root to work
 */

const fs = require("fs");

console.log("begin merge ts files ...");

const args = process.argv.splice(2);

console.log("args:" + args.join(" "));

let output_str = "";

const infos = [];
const rootName = args[0];

merge_dir(rootName);
console.log("");
output_script(rootName, infos);

function merge_dir(root) {
    const dirs = fs.readdirSync(root);
    for (const dir of dirs) {
        const path = root + "/" + dir;
        const stat = fs.lstatSync(path);
        if (stat.isDirectory() == true) {
            // console.log(path + " is directory");
            merge_dir(path);
        }
        else {
            // console.log("merge " + path);
            console.log("");
            merge_file(path);
        }
    }
}

function output_enums(array) {
    let names = [];
    for (const item of array) {
        names.push(item.name);
    }

    names.sort();

    for (const name of names) {
        console.log("output enum => " + name);
        output_str += get_info_by_name(name).data;
    }
}

function output_interfaces(array) {
    let names = [];
    for (const item of array) {
        names.push(item.name);
    }

    names.sort();
    names = sort_script_by_info(names);

    for (const name of names) {
        console.log("output interface => " + name);
        output_str += get_info_by_name(name).data;
    }
}

function output_classes(array) {
    let names = [];
    for (const item of array) {
        names.push(item.name);
    }

    names.sort();
    names = sort_script_by_info(names);

    for (const name of names) {
        console.log("output class => " + name);
        output_str += get_info_by_name(name).data;
    }
}

function sort_script_by_info(names) {
    const readyNames = [];

    // console.log("=============> names : " + names);

    // not ready array
    const notReadyNames = names.slice(0);

    while (notReadyNames.length > 0) {
        const dealNames = [];
        for (const name of notReadyNames) {
            const info = get_info_by_name(name);
            const parents = info.parents;
            const interfaces = info.interfaces;
            // console.log("============> names : " + names + ",  name : " + name + ", index : " + names.indexOf(name));
            if (names.indexOf(name) > -1) {
                if (parents.length > 0 && is_names_of_array_in_array2(parents, names, readyNames) == false) {
                    continue;
                }
                if (interfaces.length > 0 && is_names_of_array_in_array2(interfaces, names, readyNames) == false) {
                    continue;
                }
            }
            // console.log("=======> name : " + name + " is ok !!!");
            dealNames.push(name);
            readyNames.push(name);
        }
        for (const name of dealNames) {
            const index = notReadyNames.indexOf(name);
            if (index == -1) {
                throw Error("some error cos");
            }
            notReadyNames.splice(index, 1);
        }
        // console.log(notReadyNames);
    }

    return readyNames;
}

function is_names_of_array_in_array2(names, array, array2) {
    // console.log("=====> is names : " + names + " of " + array + " in " + array2);
    for (const name of names) {
        const index = array.indexOf(name);
        if (index < 0) {
            continue;
        }
        if (array2.indexOf(name) < 0) {
            // console.log("=====> no name : " + name);
            return false;
        }
    }
    return true;
}

function get_info_by_name(name) {
    for (const info of infos) {
        if (info.name == name) {
            return info;
        }
    }
    throw Error("Info Not Exist : " + name);
}

function output_script(rootName, infos) {
    const enums = [];
    for (const info of infos) {
        if (info.type == "enum") {
            enums.push(info);
        }
    }
    output_enums(enums);

    const interfaces = [];
    for (const info of infos) {
        if (info.type == "interface") {
            interfaces.push(info);
        }
    }
    output_interfaces(interfaces);

    const classes = [];
    for (const info of infos) {
        if (info.type == "class") {
            classes.push(info);
        }
    }
    output_classes(classes);

    // 其余直接输出
    for (const info of infos) {
        if (info.type !== "class" && info.type !== "interface" && info.type !== "enum") {
            output_str += info.data;
        }
    }

    output_str = "export module " + rootName + " {\r\n" + output_str + "\r\n}\r\n";

    fs.writeFileSync(rootName + ".ts", output_str);
}

function merge_file(path) {
    const data = fs.readFileSync(path).toString();

    const script = remove_module_name_from_script(data);
    const config = manage_as_enum_or_class_or_interface(script);
    // console.log(typeof config, config.type, config.name, config.interfaces, Object.keys(config));

    infos.push(config);
}

function manage_as_enum_or_class_or_interface(data) {
    const types = ["enum", "class", "interface"];

    let str = remove_abstract_string(get_defination_string(data));
    console.log("str => " + str);

    // while (str.indexOf("<") > -1) {
    //     const a = str.lastIndexOf("<");
    //     const b = str.indexOf(">", a);
    //     str = str.substr(0, a) + str.substr(b + 1);
    // }
    // console.log("str => " + str);

    const array = str.split(" ");
    remove_empty_or_null_items_of_array(array);
    console.log(array);

    const type = array[0];
    let name = array[1];
    array.splice(0, 2);

    const index = name.indexOf("<");
    if (index > -1) {
        name = name.substr(0, index);
    }

    const parents = [];
    // console.log("=====>", array.length, array[0]);
    if (array.length > 0) {
        if (array[0] == "extends") {
            // all elements before "implements" is parent class or parent interface
            array.shift();
            while (array.length > 0 && array[0] != "implements") {
                let name = array.shift();
                if (name.substr(name.length - 1) == ",") {
                    name = name.substr(0, name.length - 1);
                }
                const index = name.indexOf("<");
                if (index > -1) {
                    name = name.substr(0, index);
                }
                // console.log("check parent name : " + name);
                parents.push(name);
            }
        }
    }

    // console.log("=======>", array);
    const interfaces = [];
    if (array.length > 0) {
        if (array[0] == "implements") {
            array.shift();
            while (array.length > 0) {
                let name = array.shift();
                if (name.substr(name.length - 1) == ",") {
                    name = name.substr(0, name.length - 1);
                }
                const index = name.indexOf("<");
                if (index > -1) {
                    name = name.substr(0, index);
                }
                // console.log("check interface name : " + name);
                interfaces.push(name);
            }
        }
    }

    if (array.length > 0) {
        const a = name.indexOf("(");
        if (a > -1) {
            name = name.substr(0, a);
        }

        const b = name.indexOf(":");
        if (b > -1) {
            name = name.substr(0, b);
        }
    }

    const item = { type: type, name: name, parents: parents, interfaces: interfaces, data: data };

    console.log("type => " + type);
    console.log("name => " + name);
    console.log("parents => " + parents);
    console.log("interfaces => " + interfaces);
    // console.log(typeof item, item.type, item.name, item.parents, item.interfaces, Object.keys(item));

    return item;
}

function remove_abstract_string(data) {
    const key = "abstract ";
    const index = data.indexOf(key);
    if (index == -1) {
        return data;
    }
    return data.substr(index + key.length);
}

function get_defination_string(data) {
    const key = "export ";
    const index = data.indexOf(key);

    if (index == -1) {
        throw Error("error script" + data);
    }

    const begin = index + key.length;
    const end = data.indexOf("{", begin);

    const str = data.substring(begin, end);
    return str;
}

function remove_module_name_from_script(data) {
    const begin = data.indexOf("module");
    if (begin == -1) {
        return data;
    }

    const end = data.indexOf("{");
    data = data.substr(end + 1);

    const index = data.lastIndexOf("}");
    data = data.substr(0, index);

    const a = data.indexOf("\r\n");
    const b = data.indexOf("export");

    if (a > -1 && a < b) {
        data = data.substr(a + 2);
    }

    return data;
}

function trim(str) {
    const array = str.split("");
    while (array[0] == " ") {
        array.shift();
    }
    while (array[array.length - 1] == " ") {
        array.pop();
    }
    return array.join("");
}

function remove_empty_or_null_items_of_array(array) {
    for (let i = array.length - 1; i > -1; i--) {
        if (array[i] === "" || array[i] === void 0 || array[i] === null) {
            array.splice(i, 1);
        }
    }
}