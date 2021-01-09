#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const ejs = require('ejs')

// 传入目录参数
const dirName = process.argv[2];

inquirer.prompt([
  {
    type: 'input',
    name: 'name',
    message: 'Project name?',
    default: dirName || 'js-demo'
  },
  {
    type: 'input',
    name: 'version',
    message: 'Project version?',
    default: '0.1.0'
  },
  {
    type: 'input',
    name: 'description',
    message: 'Project description?',
    default: 'JavaScript example starter project'
  }
]).then(anwsers => {
  // 模板目录
  if(dirName) {
    fs.mkdir(dirName, function(error){
      if(error){
          console.log(error);
          return false;
      }
      renderFiles('', anwsers);
    })
  } else {
    renderFiles('', anwsers)
  }
})

function renderFiles(relDir, anwsers) {
  const dir = path.join(__dirname, 'templates', relDir)

  fs.readdir(dir, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      const pathName = path.join(dir, file);
      // 判断是否为目录，如果是则递归调用
      if(fs.lstatSync(pathName).isDirectory()) {
        const foldDir = relDir ? `${relDir}/${file}` : file;
        fs.mkdir(dirName ? `${dirName}/${foldDir}` : foldDir, function(error){
          if(error){
              console.log(error);
              return false;
          }
          renderFiles(foldDir, anwsers);
        })
      } else {
        // 目标目录
        const destDir = process.cwd()
        // 通过模板引擎渲染文件
        ejs.renderFile(path.join(pathName), anwsers, (err, result) => {
          if (err) throw err
          // 将结果写入目标文件路径
          fs.writeFileSync(path.join(destDir, dirName ? `${dirName}/${relDir}` : relDir, file), result)
        })
      }
    })
  })
}


