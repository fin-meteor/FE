import ClubListView from "@/views/club/ClubListView.vue"
import ClubDetailView from "@/views/club/ClubDetailView.vue" 
import FeedCreateView from "@/views/club/FeedCreateView.vue"
import ClubCreateView from "@/views/club/ClubCreateView.vue"
import ClubUpdateView from "@/views/club/ClubUpdateView.vue"

// 디테일 페이지는 개별 PK로 path값 지정 -> 여기선 club_pk

export default [
  {
    path: '/clubs',
    name: 'ClubListView',
    component: ClubListView,
  },
  {
    path: '/clubs/:club_pk',
    name: 'ClubDetailView',
    component: ClubDetailView,
  },
  {
    path: '/clubs/:club_pk/posts/create',
    name: 'FeedCreateView',
    component: FeedCreateView,
  },
  {
    path: '/clubs/create',
    name: 'ClubCreateView',
    component: ClubCreateView,
  },
  {
    path: '/clubs/:club_pk/update',
    name: 'ClubUpdateView',
    component: ClubUpdateView,
  },
]