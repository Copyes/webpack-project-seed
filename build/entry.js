/**
 * 获取文件路径下的所有文件
 * @param  {[type]} globalPath 文件目录
 * @param  {[type]} cutPath    要去掉的部分
 * @return {[type]}            所有的文件路径
 */
const glob = require('glob');
const path = require('path');

exports.getEntries = function(globalPath, cutPath = ''){
	let  paths = glob.sync(globalPath);
	let  entries = {};
	for(let i = 0; i < paths.length; i++){
		let pathName = path.dirname(paths[i]).replace(new RegExp('^' + cutPath), '');
		entries[pathName] = paths[i];
	}
	return entries;
}