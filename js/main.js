/*把code写到#code和style标签里*/
function writeCode(prefix, code, fn){
    let domCode = document.querySelector('#code')
    let n = 0
    let id = setInterval(() => {
      n += 1
      domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css);
      styleTag.innerHTML = prefix +  code.substring(0, n)
      domCode.scrollTop = domCode.scrollHeight
      if (n >= code.length) {
        window.clearInterval(id)
        fn && fn.call()
      }
    }, 1)
  }

  function writeMarkdown(markdown, fn){
    let domPaper = document.querySelector('#paper>.content')
    let n = 0
    let id = setInterval(() => {
      n += 1
      domPaper.innerHTML = markdown.substring(0, n)
      domPaper.scrollTop = domPaper.scrollHeight
      if (n >= markdown.length) {
        window.clearInterval(id)
        fn && fn.call()
      }
    }, 1)
  }


var result1 = `/* 
* 面试官你好，我是开开
* 只用文字作做我介绍太单调了
* 我就用代码来介绍吧
* 首先准备一些样式
*/
*{
 transition: all 1s;
}
html{
 background: #eee;
}
#code{
 border: 1px solid #aaa;
 padding: 16px;
}
/* 我需要一点代码高亮 */
.token.selector{ color: #690; }
.token.property{ color: #905; }
/* 加一个呼吸效果 */
#code{
 animation: breath 0.5s infinite alternate-reverse;
}
/* 现在正式开始 */
/* 我需要一张白纸 */
#code-wrapper{
 width: 50%; left: 0; position: fixed; 
 height: 100%;
}
#paper > .content {
display: block;
}
/* 于是我就可以在白纸上写字了，请看右边 */
`

var result2 = `

/* 接下来把 Markdown 变成HTML  - marked.js */

/* 接下来给HTML加样式 */

`
var md = `
# 自我介绍
我叫 开开
1997 年 2 月出生
海南热带海洋学院毕业
自学前端半年
希望应聘前端开发岗位
# 技能介绍
熟悉 JavaScript CSS
# 项目介绍
1. XXX 轮播
2. XXX 简历
3. XXX 画板
# 联系方式
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx
- Github
`

// # 联系方式
// - Wechat： Chenkaiwei1997
// - Email： 1035759181@qq.com
// - 手机： 
// - Github： https://github.com/18898286061



let result3 = `
/*
 * 这就是我的会动的简历
 * 谢谢观看
 */
`

writeCode('', result1, ()=>{ // writeCss call the function
    createPaper(() => {
      writeMarkdown(md, ()=> {
        writeCode(result1, result2, ()=>{
          convertMarkdownToHtml(()=>{
            writeCode(result1 + result2, result3, ()=> {
              console.log('完成')
            })
          })
        })
      })
    })
  })
  



  function createPaper(fn){
    var paper = document.createElement('div') 
    paper.id = 'paper'
    var content = document.createElement('pre')
    content.className = 'content'
    paper.appendChild(content)
    document.body.appendChild(paper)
    fn && fn.call()
  }

function convertMarkdownToHtml(fn){
    var div = document.createElement('div')  
    div.className = 'html markdown-body'
    div.innerHTML = marked(md)
    let markdownContainer = document.querySelector('#paper > .content')
    markdownContainer.replaceWith(div)
    fn && fn.call()
  }