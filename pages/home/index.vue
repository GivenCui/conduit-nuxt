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
              <li
                v-if="user"
                class="nav-item"
              >
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'your_feed'
                  }"
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'your_feed'
                    }
                  }"
                  exact
                  >Your Feed</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'global_feed'
                  }"
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'global_feed'
                    }
                  }"
                  exact
                  >Global Feed</nuxt-link>
              </li>
              <li
                v-if="tag"
                class="nav-item"
              >
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'tag'
                  }"
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'tag',
                      tag
                    }
                  }"
                >#{{tag}}</nuxt-link>
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
                <span class="date">{{article.createdAt | date('MMM D, YYYY')}}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{
                  active: article.favorited
                }"
                @click="onFavorite(article)"
                :disabled="article.favoritedDisabled"
              >
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
                    tag,
                    tab:'tag'
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
                  tag: $route.query.tag,
                  tab
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
import {
  getArticles,
  getFeedArticle,
  addFavoriteArticle,
  delFavoriteArticle
} from '@/api/article'
import { getTags } from '@/api/tags'
import { mapState } from 'vuex'

export default {
  name: 'HomeIndex',
  async asyncData ({
    query,
    store
  }) {
    // http://localhost:3000/?page=2

    const currentPage = Number.parseInt(query.page || 1, 10)
    const limit = 20
    const { tag, tab = 'global_feed' } = query
    const isLogin = !!store.state.user

    const getArticlesApi = isLogin && tab === 'your_feed'
      ? getFeedArticle
      : getArticles

    let [articlesRes, tagsRes] = await Promise.all([
      // 获取文章列表
      getArticlesApi({
        limit,
        offset: (currentPage - 1) * limit,
        tag
      }),
      // 获取标签列表
      getTags()
    ])

    const { articles, articlesCount } = articlesRes.data
    const { tags } = tagsRes.data

    // 为了处理点赞/取消点赞请求中时的标识
    articles.forEach(article => article.favoritedDisabled = false)
  
    return {
      articles,
      articlesCount,  // 总数据量
      tags: tags || [],
      limit,
      currentPage,
      tag,
      tab
    }
  },
  watchQuery: ['page', 'tag', 'tab'], // 监听query参数, 重新调用 asyncData
  computed: {
    ...mapState(['user']),
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
  },
  methods: {
    async onFavorite(article) {
      const {
      slug,
      favorited,
    } = article
      // { slug, favorited, favoritesCount }
      if(article.favoritedDisabled) return;

      article.favoritedDisabled = true

      try {
        if(favorited) {
          // 取消点赞
          await delFavoriteArticle(slug)
          article.favorited = false
          article.favoritesCount += -1
        } else {
          // 添加点赞
          await addFavoriteArticle(slug)
          article.favorited = true
          article.favoritesCount += 1
        }
        article.favoritedDisabled = false
      } catch (error) {
        article.favoritedDisabled = false
      }
    }
  }
}
</script>

<style>
</style>