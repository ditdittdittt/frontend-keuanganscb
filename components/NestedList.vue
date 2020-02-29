<template>
  <v-list flat>
    <template v-for='node in nodes'>

      <v-list-group
        v-if='(node.children && node.children.length) && level < 3'
        v-model='node.active'
        :key="node.title"
        :prepend-icon="node.icon"
        :class="spaceLeft"
      >
        <template v-slot:activator>
          <v-list-item-content @click="$router.push(parent + node.to)">
            <v-list-item-title>{{ node.title }}</v-list-item-title>
          </v-list-item-content>
        </template>

        <nested-list :nodes='node.children' :parent='parent + node.to' :level='level+1'/>

      </v-list-group>

      <v-list-item
        v-else
        :to='parent + node.to'
        :key="node.title"
        router
        exact
        color="primary"
        :class="spaceLeft"
      >
        <v-list-item-icon>
          <v-icon v-text="node.icon"></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="node.title"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-list>
</template>

<script>
  export default {
    name: 'nested-list',
    props: ['nodes', 'parent', 'level'],
    computed : {
      spaceLeft : function () {
        return "subtitle-1 ml-" + (this.$props.level + 2)
      },
    },
  }
</script>
