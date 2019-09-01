
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
    names = sort_script_by_info(names);

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
    const array = [];

    const tempArray = [];

    for (const name of names) {
        let yes = false;
        const info = get_info_by_name(name);
        if (info.parent !== null) {
            // parent class is not in this module
            yes = has_item(info.parent);
        }
        // console.log("has item => " + yes, ", name => " + info.name, "parent =>", info.parent);
        if (yes == true) {
            tempArray.push(info.name);
        }
        else {
            array.push(info.name);
        }
    }

    array.length > 0 && console.log(array);
    tempArray.length > 0 && console.log(tempArray);

    while (tempArray.length > 0) {
        const dealArray = [];
        for (const name of tempArray) {
            const info = get_info_by_name(name);
            const index = array.indexOf(info.parent);
            if (index == -1) {
                throw Error("parent is not exist");
            }
            // array.splice(index + 1, 0, name);
            array.push(name);
            dealArray.push(name);
        }
        while (dealArray.length > 0) {
            const name = dealArray.pop();
            const index = tempArray.indexOf(name);
            if (index == -1) {
                throw Error("name is missiong:" + name);
            }
            tempArray.splice(index, 1);
        }
        tempArray.length > 0 && console.log(tempArray);
    }

    // console.log(array);

    return array;
}

function has_item(name) {
    for (const info of infos) {
        if (info.name == name) {
            return true;
        }
    }
    return false;
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

    fs.writeFileSync(rootName + ".ts", output_str);
}

function return_script_by_name(name) {
    for (const info of infos) {
        if (info.name == name) {
            return info.data;
        }
    }
    throw Error("unknow script name:" + name);
}

function sort_script(infos) {

}

function sort_interface(infos) {

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

    const array = str.split(" ");
    remove_empty_or_null_items_of_array(array);

    const type = array[0];
    const name = array[1];

    const parent = array[2] == "extends" ? array[3] : null;
    if (parent !== null) {
        array.splice(2, 2);
    }

    if (array.length > 2) {
        array.shift();
        array.shift();
        array.shift();
    }
    else {
        array.length = 0;
    }

    console.log("str => " + str);
    console.log("type => " + type);
    console.log("name => " + name);
    console.log("parent => " + parent);
    console.log("interfaces => " + array);

    const item = { type: type, name: name, parent: parent, interfaces: array, data: data };
    // console.log(typeof item, item.type, item.name, item.interfaces, Object.keys(item));

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