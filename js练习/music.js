/* 
接口信息
请求地址：https://autumnfish.cn/search
请求方法：get
请求参数：keywords
响应内容：歌曲搜索结果
*/

/*
请求地址：https://autumnfish.cn/song/url
请求方法：get
请求参数：id(歌曲id)
响应内容：歌曲url地址
*/

/*
请求地址：https://autumnfish.cn/song/detail
请求方法：get
请求参数：ids(歌曲id)
响应内容：歌曲详情，包括封面信息
*/

/*
请求地址：https://autumnfish.cn/comment/hot?type=0
请求方法：get
请求参数：id(歌曲id,type固定为0)
响应内容：歌曲的热门评论
*/

var app = new Vue({
    el:'#app',
    data:{
        keyword:'',
        songs:[{name:'来听歌٩(๑´0`๑)۶'}],
        imgSrc : 'images/moon.png',
        id :0,
        songUrl:'',
        comments:[],
        isPlaying:false,
    },
    methods:{

        getMusic:function(){
            var that = this
            axios.get('https://autumnfish.cn/search?keywords='+that.keyword).then
            (function(response){
                console.log(response.data.result.songs);
                that.songs = response.data.result.songs;
                console.log(that.songs)
            },function(err){
                console.log(err)
            })
        },

        play : function(index){
            this.id = this.songs[index].id;

            // 获取搜索结果列表
            var that = this
            axios.get('https://autumnfish.cn/song/url?id='+ that.id ).then(
                function(response){
                    that.songUrl = response.data.data[0].url
                },function(err){
                    console.log(err)
                }
            );

            // 获取图片地址
            axios.get('https://autumnfish.cn/song/detail?ids=' + that.id).then(
                function(response){
                    that.imgSrc = response.data.songs[0].al.picUrl;
                },function(err){
                    console.log(err)
                }
            );
            
            // 获取评论
            axios.get('https://autumnfish.cn/comment/hot?type=0&id=' + that.id).then(
                function(response){
                    console.log(response)
                    that.comments = response.data.hotComments
                },function(err){
                    console.log(err)
                },
            );

            // 播放动画 1.监听音乐播放（v-on play) 2.监听音乐暂停(v-on pause) 3.增删类名（v-bind ）
        },

        going : function(){
            this.isPlaying = true
        },
        stop : function(){
            this.isPlaying = false
        }
        
    }
})
