<template>
    <div class="pt-52">
        <pagination 
        :length="100"
        :currentPage="10"
        :showLength="2"/>
    </div>
    
    <navBar  class="opacity-[50%]"/>
    <!-- <div>
        <div>
            <p ref="head">header</p>
            <div class="p-2 bg-blue">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae sequi quasi illum suscipit, labore assumenda ipsam minima id eaque magni accusantium obcaecati sed accusamus culpa harum quos consectetur tenetur consequuntur ducimus odio. Quia non pariatur, exercitationem dolore quaerat ex, deserunt recusandae veritatis est eos at quod inventore mollitia quibusdam, nulla ducimus minus distinctio? Incidunt animi labore asperiores ullam consectetur autem quis laboriosam totam quaerat adipisci illum facilis dolorum maiores veritatis ratione maxime, eos quia alias earum doloremque id quos dolores necessitatibus? Enim tempore sequi repellat voluptatibus totam laboriosam nostrum quas nobis modi nam sunt dolor magnam velit esse suscipit placeat quod, ut doloremque recusandae possimus accusamus neque architecto, qui perspiciatis. Tempora harum fugit dolorem temporibus qui magnam ducimus molestias soluta et explicabo numquam fuga quas atque unde delectus, eaque, repellendus odio? Aliquam, sunt, nesciunt beatae iusto laudantium consectetur nisi consequatur id ex, facilis a quas reprehenderit suscipit saepe voluptatem dignissimos explicabo nihil dolores eligendi eaque! Aliquam ullam, cupiditate vel impedit maxime qui eos laboriosam dolores ab natus repudiandae sit optio nam consectetur consequatur? Amet soluta necessitatibus tempore quia, nemo quisquam architecto eum vero fugiat itaque id ipsam nisi officiis earum excepturi dolor ea natus veritatis doloribus quas. Totam, asperiores iusto.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae sequi quasi illum suscipit, labore assumenda ipsam minima id eaque magni accusantium obcaecati sed accusamus culpa harum quos consectetur tenetur consequuntur ducimus odio. Quia non pariatur, exercitationem dolore quaerat ex, deserunt recusandae veritatis est eos at quod inventore mollitia quibusdam, nulla ducimus minus distinctio? Incidunt animi labore asperiores ullam consectetur autem quis laboriosam totam quaerat adipisci illum facilis dolorum maiores veritatis ratione maxime, eos quia alias earum doloremque id quos dolores necessitatibus? Enim tempore sequi repellat voluptatibus totam laboriosam nostrum quas nobis modi nam sunt dolor magnam velit esse suscipit placeat quod, ut doloremque recusandae possimus accusamus neque architecto, qui perspiciatis. Tempora harum fugit dolorem temporibus qui magnam ducimus molestias soluta et explicabo numquam fuga quas atque unde delectus, eaque, repellendus odio? Aliquam, sunt, nesciunt beatae iusto laudantium consectetur nisi consequatur id ex, facilis a quas reprehenderit suscipit saepe voluptatem dignissimos explicabo nihil dolores eligendi eaque! Aliquam ullam, cupiditate vel impedit maxime qui eos laboriosam dolores ab natus repudiandae sit optio nam consectetur consequatur? Amet soluta necessitatibus tempore quia, nemo quisquam architecto eum vero fugiat itaque id ipsam nisi officiis earum excepturi dolor ea natus veritatis doloribus quas. Totam, asperiores iusto.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae sequi quasi illum suscipit, labore assumenda ipsam minima id eaque magni accusantium obcaecati sed accusamus culpa harum quos consectetur tenetur consequuntur ducimus odio. Quia non pariatur, exercitationem dolore quaerat ex, deserunt recusandae veritatis est eos at quod inventore mollitia quibusdam, nulla ducimus minus distinctio? Incidunt animi labore asperiores ullam consectetur autem quis laboriosam totam quaerat adipisci illum facilis dolorum maiores veritatis ratione maxime, eos quia alias earum doloremque id quos dolores necessitatibus? Enim tempore sequi repellat voluptatibus totam laboriosam nostrum quas nobis modi nam sunt dolor magnam velit esse suscipit placeat quod, ut doloremque recusandae possimus accusamus neque architecto, qui perspiciatis. Tempora harum fugit dolorem temporibus qui magnam ducimus molestias soluta et explicabo numquam fuga quas atque unde delectus, eaque, repellendus odio? Aliquam, sunt, nesciunt beatae iusto laudantium consectetur nisi consequatur id ex, facilis a quas reprehenderit suscipit saepe voluptatem dignissimos explicabo nihil dolores eligendi eaque! Aliquam ullam, cupiditate vel impedit maxime qui eos laboriosam dolores ab natus repudiandae sit optio nam consectetur consequatur? Amet soluta necessitatibus tempore quia, nemo quisquam architecto eum vero fugiat itaque id ipsam nisi officiis earum excepturi dolor ea natus veritatis doloribus quas. Totam, asperiores iusto.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae sequi quasi illum suscipit, labore assumenda ipsam minima id eaque magni accusantium obcaecati sed accusamus culpa harum quos consectetur tenetur consequuntur ducimus odio. Quia non pariatur, exercitationem dolore quaerat ex, deserunt recusandae veritatis est eos at quod inventore mollitia quibusdam, nulla ducimus minus distinctio? Incidunt animi labore asperiores ullam consectetur autem quis laboriosam totam quaerat adipisci illum facilis dolorum maiores veritatis ratione maxime, eos quia alias earum doloremque id quos dolores necessitatibus? Enim tempore sequi repellat voluptatibus totam laboriosam nostrum quas nobis modi nam sunt dolor magnam velit esse suscipit placeat quod, ut doloremque recusandae possimus accusamus neque architecto, qui perspiciatis. Tempora harum fugit dolorem temporibus qui magnam ducimus molestias soluta et explicabo numquam fuga quas atque unde delectus, eaque, repellendus odio? Aliquam, sunt, nesciunt beatae iusto laudantium consectetur nisi consequatur id ex, facilis a quas reprehenderit suscipit saepe voluptatem dignissimos explicabo nihil dolores eligendi eaque! Aliquam ullam, cupiditate vel impedit maxime qui eos laboriosam dolores ab natus repudiandae sit optio nam consectetur consequatur? Amet soluta necessitatibus tempore quia, nemo quisquam architecto eum vero fugiat itaque id ipsam nisi officiis earum excepturi dolor ea natus veritatis doloribus quas. Totam, asperiores iusto.
            </div>
            <div @click="run" class="p-3 bg-red-300">asdfasd</div>
        </div>
    </div> -->
</template>

<script setup>
import {ref} from 'vue'
import pagination from './components/pagination/pagination.vue'
import navBar from './components/navBar.vue'
import HomeView from './views/HomeView.vue'

// const head = ref(null)
// const run = () => {
//     head.value.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

// }

</script>


<!-- <HomeView /> -->




































<!-- responsive-text --- font-size: calc(16px + (24 -16) * ((100vw - 320px) / (1920 - 320))); -->
