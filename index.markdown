---
title: Home
layout: default
color_: home
---

<r-grid class="main" columns=6 columns-s=4 columns-xs=2>

<r-cell order="-10" span=4 span-s=2>
    <h1>@H.Yan</h1>
</r-cell>

<r-cell order="-9" class="menu" span=2 span-s=2>
    <div class='focus0'>
      <a href="/">&#x25CF;</a>
      <a href="/about/">About</a>
      <a href="/project/">Projects</a>
      <a href="/blog/">Blogs</a>
    </div>
</r-cell>

<!-- grid -->
<r-cell span=4>
<h2 class="margin-b-4"><a href="/project/">Projects</a></h2>

<h3><a href="/vitiv/">VITIV</a></h3>
<p>解构视觉感知的界限：在视觉、智能与现实的交界处探索
</p>

<h3><a href="/project/" class="dimmed">See all projects &rarr;</a></h3>
</r-cell>

<r-cell span=4>
<h2 class="margin-b-4"><a href="/blog/">Latest posts</a></h2>

<ul>
  {% for post in site.posts limit:3 %}
    {% unless post.is_project %}
    <li>
      <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
      <p>{{ post.date | date: "%Y-%m-%d" }}</p>
      <!-- <p>{{ post.excerpt | strip_html | truncatewords: 30 }}</p> -->
    </li>
    {% endunless %}
  {% endfor %}
</ul>

<h3><a href="/blog/" class="dimmed">See all blog posts &rarr;</a></h3>
</r-cell>

<!-- 
<r-cell class="intro" order-s="-2" order-xs="-2" span=2 span-s=3 span-xs=row>
    <div class="intro-content">
        <p>
        Hey, this is H.Yan. <br>
        <br>
        Researcher, Engineer, Quant<br> 
        a curious human being<br>
        <br>
        based in Shanghai, China<br> 
        educated in France<br>
        </p>
    </div>
</r-cell> -->

</r-grid>