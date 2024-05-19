<template>
    <q-page class="q-pa-md">
        <div class="section">
            <div class="title">現狀和痛點</div>
            <div class="content">
                <p>高雄市擁有龐大的觀光旅遊潛力，現在透過演唱會等活動吸引了大量人潮，高雄市政府也祭出了 <strong>加食延暢</strong> 以及 <strong>高雄夜間進修部</strong>
                    等方案，大大增加了旅客過夜的機會，但仍缺少一個關鍵，讓旅客將旅遊體驗，從演唱會延伸到高雄特色體驗</p>
            </div>
        </div>

        <div class="section">
            <div class="title">解決方案</div>
            <div class="content">
                <p>我們提出的解決方案是將生成式人工智慧技術與現有的高雄旅遊網資訊相結合，以增加旅遊的趣味性，並通過社群行銷來提高知名度。我們的核心目標是讓旅客在高雄的旅行中體驗到更多樂趣，同時促進旅客與景點之間的互動。
                </p>
                <p>為此，我們設計了行程故事型人工智慧，旨在通過引人入勝的故事情節，讓旅客更主動地參與導覽、了解歷史、探索城市等活動。這些故事將透過背景介紹、前導情節、地點指引以及結局來引導故事走向，不僅為每位旅客打造出獨一無二的旅行體驗，未來還能夠透過加入在地歷史背景、時事讓故事和文化接軌。
                </p>
            </div>
        </div>

        <div class="section">
            <div class="title">技術架構</div>
            <div class="content">
                <div class="sub-title">AI 景點 RAG 推薦</div>
                <p>搜尋上提供了兩種搜尋方式，而其中 AI 增強搜尋是利用語意來搜尋的，比如「看海」會提供海邊及各式水域活動。架構上使用了 Cohere embed-multilingual-v3.0
                    ，以支援多語言的搜尋，維度資料庫使用 chromadb ，而在每次 AI 增強搜尋，都會為用戶介紹排名前 10 的旅遊景點。</p>

                <div class="sub-title">行程故事型人工智慧</div>
                <p>高雄旅遊網有精彩的行程及該行程配套的交通措施，故事型人工智能旨在增強旅遊的趣味性以及體驗性，透過故事和角色 IP 的引入，增加了讓旅客主動接觸導覽、主動了解歷史、主動探索城市的趣味。</p>

                <div class="sub-title"> AI 聊天室機器人</div>
                <p>資料庫的有限資源無法應對客戶變化的需求，透過 Agentic 架構，用戶的問題會交由 AI 判斷需要用資料庫的資訊回答，還是用即時聯網的資訊來回應</p>
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

.section:hover {
    background-color: #f4cf6bf7;
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