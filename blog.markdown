---
layout: default
color_: blog
title: Blog
permalink: /blog/
---

<r-grid class="main" columns=6 columns-s=4 columns-xs=2>

<r-cell order="-10" span=4 span-s=2>
  <h1>Thoughts and Ideas</h1>
</r-cell>

<r-cell order="-9" class="menu" span=2 span-s=2>
  <div class='focus4'>
    <a href="/">&#x25CF;</a>
    <a href="/about/">About</a>
    <a href="/project/">Projects</a>
    <a href="/blog/">Blogs</a>
  </div>
</r-cell>
</r-grid>

<!-- 在这里添加博客文章列表 -->
<!-- <r-grid columns=6 columns-s=4 columns-xs=2> -->
<r-cell span=2>
  <h3>Blog posts</h3>
  <ul>
    {% for post in site.categories.blog %}
      <li>
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        - {{ post.date | date: "%Y-%m-%d" }}
      </li>
    {% endfor %}

  </ul>
</r-cell>
<!-- </r-grid> -->