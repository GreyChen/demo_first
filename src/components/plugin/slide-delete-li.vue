<template>
    <div id="slideDeleteLi">
        <div class="content">
            <slot></slot>
        </div>
        <div class="btn">
            删除
        </div>
    </div>
</template>
<style lang="scss">
    #slideDeleteLi {
        display: flex;
        justify-content: space-between;
        width: 100%;
        position: relative;
        overflow: hidden;
        .content {
            width: 100%;
        }
        .btn {
            width: 20%;
            background: #cda668;
            color: #fff;
            position: absolute;
            left: 100%;
            top: 0;
        }
    }
</style>

