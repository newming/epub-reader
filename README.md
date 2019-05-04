# epub电子书阅读器

[课程源码](https://github.com/sam9831/free-ebook-demo)

电子书格式

- text
- pdf
- epub: Electronic Publication 电子出版物
- mobi: Kindle的电子书格式

## epub格式分析

```bash
# epub本身是个压缩文件 可以对其进行解压
# 解压出来的内容如下
$: unzip epub/23776.epub
Archive:  epub/23776.epub
inflating: stylesheet.css
extracting: mimetype # 表示epub资源文件的格式
creating: META-INF/
inflating: META-INF/container.xml # 跟文件的路径
inflating: page.xhtml
inflating: chapter_3260847.xhtml
inflating: chapter_3260848.xhtml
inflating: chapter_3260849.xhtml
inflating: chapter_3260850.xhtml
inflating: chapter_3260851.xhtml
inflating: chapter_3260852.xhtml
inflating: chapter_3260853.xhtml
inflating: chapter_3260854.xhtml
inflating: chapter_3260855.xhtml
inflating: chapter_3260856.xhtml
inflating: chapter_3260857.xhtml
inflating: chapter_3260858.xhtml
inflating: catalog.xhtml
inflating: content.opf # 是个html文件，列出了书籍的大部分信息，包含章节，阅读顺序等
inflating: toc.ncx
```

> 这个项目是用 vue-cli 3.0 创建出来的，静态资源目录为 public，note 目录放了一些笔记相关的东西