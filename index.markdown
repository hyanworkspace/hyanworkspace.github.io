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

<r-cell span=2>
<h2 class="margin-b-4"><a href="/project/">Projects</a></h2>

<h3><a href="/vitiv/">VITIV</a></h3>
<p>A Python-Flask based web application for a human-machine interaction based on video, image and text.
</p>

<h3><a href="/project/" class="dimmed">See all projects &rarr;</a></h3>
</r-cell>

<r-cell span=2>
<h2 class="margin-b-4"><a href="/blog/">Latest posts</a></h2>

<ul>
  {% for post in site.posts limit:3 %}
    <li>
      <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
      <p>{{ post.date | date: "%Y-%m-%d" }}</p>
      <p>{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
    </li>
  {% endfor %}
</ul>

<h3><a href="/blog/" class="dimmed">See all blog posts &rarr;</a></h3>
</r-cell>

<r-cell class="intro" order-s="-2" order-xs="-2" span=2 span-s=3 span-xs=row>
    <p>
    Hey, this is H.Yan. <br>
    <br>
    Researcher, Engineer, Quant<br> 
    a curious human being<br>
    <br>
    based in Shanghai, China<br> 
    educated in France<br>
    </p>
    <!-- <div class="quick-links">
    <a href="https:/">
        AaBbCc123<br>
        The Inter typeface family &rarr;
    </a>
    <a href="https://shop./">Buy a nice poster &rarr;</a>
    </div> -->
</r-cell>

</r-grid>