<template>
  <div id="app">
    <Login v-if="$root.displayLogin"/>
    <Content v-else />
  </div>
</template>

<script>
    import Login from "./components/Login"
    import Content from "./components/Content"
    export default {
        components: {
            Content,
            Login
        },
        data() {
            return {
                Authorization_usertoken: "",
            }
        },
        mounted() {
            this.Authorization_usertoken = this.getCookie("Authorization_usertoken");
            if (this.Authorization_usertoken == "") {
                this.$root.displayLogin = true;
            } else {
                this.$root.displayLogin = false;
            }
        },
        methods: {
            getCookie(cname)  {    
                var  name  =  cname  +  "=";    
                var  ca  =  document.cookie.split(';');    
                for  (var  i  =  0;  i  <  ca.length;  i++)  {        
                    var  c  =  ca[i].trim();        
                    if  (c.indexOf(name)  ==  0)  {            
                        return  c.substring(name.length,  c.length);        
                    }    
                }    
                return  "";
            }
        }
    }
</script>

<style>
    html,
    body {
        margin: 0;
        padding: 0;
        list-style: none;
        text-decoration: none;
        font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
        font-size: 14px;
        overflow-x: hidden;
    }
    
    a,
    article,
    aside,
    body,
    button,
    dd,
    details,
    div,
    dl,
    dt,
    figcaption,
    figure,
    footer,
    form,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    header,
    hgroup,
    img,
    input,
    li,
    menu,
    nav,
    ol,
    p,
    section,
    select,
    table,
    tbody,
    td,
    textarea,
    th,
    tr,
    ul {
        padding: 0;
        margin: 0;
        border: 0;
    }
</style>