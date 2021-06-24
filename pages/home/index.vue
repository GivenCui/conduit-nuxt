<template>
  <div class="home-page">

    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">

        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a class="nav-link disabled"
                   href="">Your Feed</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active"
                   href="">Global Feed</a>
              </li>
            </ul>
          </div>

          <div class="article-preview"
               v-for="article in articles"
               :key="article.slug">
            <div class="article-meta">
              <nuxt-link :to="{
                  name: 'profile',
                  params: {
                    username: article.author.username
                  }
                }"><img :src="article.author.image" /></nuxt-link>
              <div class="info">
                <nuxt-link :to="{
                    name: 'profile',
                    params: {
                      username: article.author.username
                    }
                  }"
                           class="author">
                  {{article.author.username}}
                </nuxt-link>
                <span class="date">{{article.createdAt}}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right"
                      :class="{
                  active: article.favorited
                }">
                <i class="ion-heart"></i> {{article.favoritesCount}}
              </button>
            </div>
            <nuxt-link :to="{
                name: 'article',
                params: {
                  slug: article.slug
                }  
              }"
                       class="preview-link">
              <h1>{{article.title}}</h1>
              <p>{{article.body}}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>

        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link
                :to="{
                  name: 'home',
                  query: {
                    tag
                  }
                }"
                v-for="(tag, index) in tagsList"
                :key="index"
                class="tag-pill tag-default"
              >
                {{tag}}
              </nuxt-link>
            </div>
          </div>
        </div>

      </div>

      <!-- 分页列表 -->
      <nav>
        <ul class="pagination">
          <li
            v-for="page in totalPage"
            :key="page"
            class="page-item"
            :class="{ active: currentPage === page }"
          >
            <nuxt-link
              class="page-link"
              :to="{
                name: 'home',
                query: {
                  page,
                  tag: $route.query.tag
                }
              }"
            >
              {{page}}
            </nuxt-link>
          </li>
        </ul>
      </nav>
      <!-- /分页列表 -->

    </div>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import { getTags } from '@/api/tags'

export default {
  name: 'HomeIndex',
  async asyncData ({
    query
  }) {
    // http://localhost:3000/?page=2

    const currentPage = Number.parseInt(query.page || 1, 10)
    const limit = 20

    let [articlesRes, tagsRes] = await Promise.all([
      // 获取文章列表
      getArticles({
        limit,
        offset: (currentPage - 1) * limit,
        tag: query.tag
      }),
      // 获取标签列表
      getTags()
    ])

    const { articles, articlesCount } = articlesRes.data
    const { tags } = tagsRes.data

    // console.log(data.articles[0]);
    return {
      articles,
      articlesCount,  // 总数据量
      limit,
      currentPage,
      tags: tags || []
    }
  },
  watchQuery: ['page', 'tag'], // 监听query参数, 重新调用 asyncData
  computed: {
    totalPage () {
      return Math.ceil(this.articlesCount / this.limit);
    },
    tagsList () {
      return this.tags.filter(tag => {
        // 零宽字符  参考: https://yuanfux.github.io/zero-width-web/
        tag = tag.replace(/[\u200B-\u200D\uFEFF]/g, '')
        return !!tag
      })
    }
  }
}
</script>

<style>
</style>