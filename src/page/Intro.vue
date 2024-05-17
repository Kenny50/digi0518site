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

                <div class="sub-title">旅客回饋 AI 總結</div>
                <p>不論是任何產品，用戶回饋永遠都是最重要的，只有真正的瞭解用戶的意見，才能不斷打造出用戶喜歡的產品。AI
                    總結主要為了解決大量的回饋的消化，以及洞察出頻繁出現的需求，讓政府能夠以有效率的方式，傾聽民眾的意見，來規劃更好更便民的旅遊體驗，技術上使用兩種方式：</p>
                <ol>
                    <li>大語言模型總結</li>
                    <ul>透過大語言模型，將大量的用戶回饋逐步總結，再透過生成式彙整資訊，給出民眾聲音中最強烈的建議</ul>
                    <!-- <li>降維分群演算法總結</li>
                    <ul>文字會先被解析為 384 維度，透過演算法將資訊降維分析，依照回饋節點的集合，彙整資訊</ul> -->
                </ol>
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