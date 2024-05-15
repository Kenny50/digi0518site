<template>
    <q-page class="q-pa-md">
        <div class="section">
            <div class="title">痛點</div>
            <div class="content">
                <p>高雄市擁有龐大的觀光旅遊潛力，但其缺乏行銷和廣告的策略，這導致其未能充分展現這一潛力。儘管透過演唱會等活動能夠吸引人潮，但高雄市需要更多被看見的機會，以進一步推動觀光旅遊業的發展。</p>
            </div>
        </div>

        <div class="section">
            <div class="title">解決方案</div>
            <div class="content">
                <p>我們提出的解決方案是將生成式人工智慧技術與現有的高雄旅遊網相結合，以增加旅遊的趣味性，並通過社群行銷來提高知名度。我們的核心目標是讓旅客在高雄的旅行中體驗到更多樂趣，同時促進旅客與景點之間的互動。
                </p>
                <p>為此，我們設計了行程故事型人工智慧，旨在通過引人入勝的故事情節，讓旅客更主動地參與導覽、了解歷史、探索城市等活動。這些故事將包括背景介紹、前導情節、地點指引以及結局，從而為每位旅客打造出獨一無二的旅行體驗。
                </p>
            </div>
        </div>

        <div class="section">
            <div class="title">技術架構</div>
            <div class="content">
                <div class="sub-title">AI 景點 RAG 推薦</div>
                <p>搜尋上提供了兩種搜尋方式，而其中 AI 增強搜尋是利用語意來搜尋的，比如「看海」會提供海邊及各式水域活動。架構上使用了 cohere-multilingue-model
                    ，以支援多語言的搜尋，維度資料庫使用 chromadb ，而在每次 AI 增強搜尋，都會為用戶介紹排名前 10 的旅遊景點。</p>

                <div class="sub-title">行程故事型人工智慧</div>
                <p>高雄旅遊網有精彩的行程及該行程配套的交通措施，故事型人工智能旨在增強旅遊的趣味性以及體驗性，透過故事的引入，增加了讓旅客主動接觸導覽、主動了解歷史、主動探索城市的趣味。</p>

                <div class="sub-title">旅客回饋 AI 總結</div>
                <p>不論是任何產品，用戶回饋永遠都是最重要的，只有真正的瞭解用戶的意見，才能不斷打造出用戶喜歡的產品。AI
                    總結主要為了解決大量的回饋的消化，以及洞察出頻繁出現的需求，讓政府能夠以有效率的方式，傾聽民眾的意見，來規劃更好更便民的旅遊體驗，技術上使用兩種方式：</p>
                <ul>
                    <li>大語言模型總結</li>
                    <li>降維分群演算法總結</li>
                </ul>
            </div>
        </div>
    </q-page>
</template>

<script>
export default {
    name: 'TourismSolutionPage'
}
</script>

<style scoped>
.section {
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
}

.title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
}

.content {
    font-size: 1rem;
    color: #555;
    line-height: 1.5;
}

.sub-title {
    font-size: 1.2rem;
    font-weight: bold;
    color: #666;
    margin-bottom: 10px;
}
</style>