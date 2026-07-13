import {
  ArrowDown,
  ArrowRight,
  AtSign,
  BookOpen,
  CalendarDays,
  Check,
  Clock3,
  Heart,
  Instagram,
  Link2,
  MessageCircle,
  PenLine,
  Repeat2,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Store,
  UserRound,
  Users,
  X,
  Zap,
} from "lucide-react";

const FlowArrow = () => <ArrowRight className="flow-arrow" aria-hidden="true" />;
const DownArrow = () => <ArrowDown className="down-arrow" aria-hidden="true" />;

function MiniPost({ label, text, accent = false }: { label: string; text: string; accent?: boolean }) {
  return (
    <div className={`mini-post ${accent ? "is-accent" : ""}`}>
      <div className="mini-avatar">X</div>
      <div>
        <div className="mini-meta"><strong>{label}</strong><span>@store</span></div>
        <p>{text}</p>
        <div className="mini-actions"><MessageCircle /><Repeat2 /><Heart /></div>
      </div>
    </div>
  );
}

export function Visual({ type }: { type: string }) {
  switch (type) {
    case "network":
      return (
        <div className="network-visual" aria-label="会話がネットワークへ広がる図">
          <div className="network-lines" aria-hidden="true" />
          <div className="network-core"><span>X</span><small>STORE</small></div>
          <div className="network-node node-a"><BookOpen /><span>専門性</span></div>
          <div className="network-node node-b"><Repeat2 /><span>継続</span></div>
          <div className="network-node node-c"><MessageCircle /><span>会話</span></div>
          <div className="floating-post post-a">新刊、届きました。</div>
          <div className="floating-post post-b">この棚の理由は…</div>
        </div>
      );
    case "chapterExpertise":
      return <div className="chapter-symbol"><div className="orbit"><BookOpen /></div><div className="signal-ring ring-one" /><div className="signal-ring ring-two" /><div className="audience-dot dot-one" /><div className="audience-dot dot-two" /><div className="audience-dot dot-three" /></div>;
    case "platformCompare":
      return (
        <div className="compare-grid platform-grid">
          <div className="compare-card instagram-card"><Instagram /><span>Instagram</span><strong>来店理由を届ける</strong><small>世界観・売場・商品を蓄積</small></div>
          <div className="versus">役割</div>
          <div className="compare-card x-card"><span className="x-mark">X</span><span>X</span><strong>専門性を育てる</strong><small>発見・速報・会話が広がる</small></div>
        </div>
      );
    case "growthLoop":
      return (
        <div className="loop-visual">
          <svg viewBox="0 0 340 340" aria-hidden="true"><circle cx="170" cy="170" r="120" /><path d="M274 111l18 7-6-20" /><path d="M66 229l-18-7 6 20" /></svg>
          <div className="loop-center"><BookOpen /><strong>本の専門性</strong></div>
          <div className="loop-chip chip-top"><Sparkles />おすすめ</div>
          <div className="loop-chip chip-right"><Heart />反応</div>
          <div className="loop-chip chip-bottom"><Users />仲間</div>
          <div className="loop-chip chip-left"><Zap />影響力</div>
        </div>
      );
    case "recommendFlow":
      return (
        <div className="flow-row recommendation-flow">
          <div className="flow-node"><BookOpen /><span>発信を重ねる</span><strong>専門性</strong></div><FlowArrow />
          <div className="flow-node"><Search /><span>興味が近い</span><strong>本好きへ</strong></div><FlowArrow />
          <div className="flow-node"><Heart /><span>いいね・返信</span><strong>反応</strong></div><FlowArrow />
          <div className="flow-node featured"><Zap /><span>さらに広がる</span><strong>影響力</strong></div>
        </div>
      );
    case "followerCompare":
      return (
        <div className="compare-grid audience-grid">
          <div className="audience-case bad"><div className="case-label"><X />数だけ増やす</div><div className="people-cloud muted">{Array.from({ length: 12 }, (_, i) => <UserRound key={i} />)}</div><strong>1,000</strong><span>反応 5</span><small>興味が薄く、会話がない</small></div>
          <div className="audience-case good"><div className="case-label"><Check />関係を育てる</div><div className="people-cloud">{Array.from({ length: 6 }, (_, i) => <UserRound key={i} />)}</div><strong>100</strong><span>反応 20</span><small>興味が合い、会話が続く</small></div>
        </div>
      );
    case "chapterPost":
      return <div className="chapter-post-stack"><MiniPost label="書店スタッフ" text="この一冊、売場で語らせてください。" accent /><div className="stack-shadow shadow-one" /><div className="stack-shadow shadow-two" /></div>;
    case "photoRhythm":
      return (
        <div className="photo-sequence">
          <div className="photo-frame shot-close"><div className="book-mock"><span>BOOK</span></div><small>日常 / 寄り</small></div>
          <div className="photo-frame shot-medium"><div className="shelf-mock">{Array.from({ length: 8 }, (_, i) => <i key={i} />)}</div><small>企画 / 中</small></div>
          <div className="photo-frame shot-wide"><div className="store-mock"><Store /><span>大型フェア</span></div><small>ここぞ / 引き</small></div>
        </div>
      );
    case "humanPhoto":
      return (
        <div className="human-scene">
          <div className="shelf-background">{Array.from({ length: 18 }, (_, i) => <span key={i} />)}</div>
          <div className="staff-figure"><div className="staff-head" /><div className="staff-body"><div className="name-tag">STAFF</div></div><div className="staff-arm"><div className="held-book">私の推し</div></div></div>
          <div className="human-caption"><Heart /><span>顔出しなしでも<br /><strong>人の気配は伝わる</strong></span></div>
        </div>
      );
    case "copyCompare":
      return (
        <div className="copy-compare">
          <div className="speech bad"><span><X />事務連絡</span><p>〇〇文庫が全点揃いました。皆様のご来店をお待ちしております。</p></div>
          <div className="speech good"><span><Sparkles />熱量が見える</span><p><strong>圧巻です…！</strong><br />〇〇文庫が全点コンプリート。このスケール、ぜひ店頭で体感してください！</p></div>
        </div>
      );
    case "trustPyramid":
      return (
        <div className="pyramid-wrap"><div className="pyramid-level level-top"><Zap /><strong>大きな反響</strong></div><div className="pyramid-level level-mid"><Heart /><strong>信頼と期待</strong></div><div className="pyramid-level level-base"><Repeat2 /><strong>日々の小さな投稿</strong><span>新刊・選書・売場・会話</span></div></div>
      );
    case "chapterAlgorithm":
      return <div className="algorithm-map"><div className="algo-core"><Sparkles /><strong>おすすめ</strong></div><div className="algo-item algo-time"><Clock3 />時間</div><div className="algo-item algo-value"><BookOpen />価値</div><div className="algo-item algo-talk"><MessageCircle />会話</div><div className="algo-item algo-trust"><Users />信頼</div></div>;
    case "timeTimeline":
      return (
        <div className="time-visual"><div className="clock-face"><Clock3 /><strong>いつ見る？</strong></div><div className="time-track"><div className="time-slot"><span>07:30</span><strong>通勤・通学</strong><small>新着情報</small></div><div className="time-slot active"><span>17:30</span><strong>放課後・退勤</strong><small>おすすめ</small></div><div className="time-slot"><span>20:30</span><strong>自宅時間</strong><small>企画予告</small></div></div></div>
      );
    case "hashtagCompare":
      return (
        <div className="hashtag-visual"><div className="tag-case too-many"><span><X />やりすぎ</span><div>#本 #読書 #書店<br />#新刊 #おすすめ<br />@brand https://...</div><small>伝えたいことが埋もれる</small></div><div className="tag-case just-right"><span><Check />適量</span><div className="single-tag">#夏の文庫フェア</div><small>目的のある1個だけ</small></div></div>
      );
    case "replyFlow":
      return (
        <div className="thread-flow"><div className="thread-line" /><div className="thread-post main"><div className="thread-avatar">X</div><div><strong>本投稿</strong><p>フェアの魅力と、来てほしい理由</p></div></div><DownArrow /><div className="thread-post"><div className="thread-avatar reply"><Link2 /></div><div><strong>リプ 1</strong><p>詳細URL・参加方法</p></div></div><DownArrow /><div className="thread-post"><div className="thread-avatar reply"><BookOpen /></div><div><strong>リプ 2</strong><p>対象商品・追加情報</p></div></div></div>
      );
    case "contentDonut":
      return (
        <div className="donut-layout"><div className="donut" role="img" aria-label="新規投稿80%、セルフリポスト20%"><div><strong>10</strong><span>POSTS</span></div></div><div className="donut-legend"><div><i className="new" /><span>新規投稿</span><strong>70-80%</strong></div><div><i className="repost" /><span>セルフリポスト</span><strong>20-30%</strong></div><p><Repeat2 /> 引用リポストは新しい投稿として活用</p></div></div>
      );
    case "chatConversation":
      return (
        <div className="chat-ui"><div className="chat-message incoming"><div className="chat-avatar"><UserRound /></div><p>この本、読みました！</p></div><div className="chat-message outgoing"><p>ありがとうございます。<br />どの場面が印象的でしたか？</p><div className="chat-avatar store"><Store /></div></div><div className="conversation-signal"><Heart /><span>双方向の反応</span><Repeat2 /></div></div>
      );
    case "endorsementCompare":
      return (
        <div className="endorsement"><div className="voice self"><Store /><span>自分で言う</span><p>うちの商品、良いでしょ！</p><div className="trust-meter"><i /></div><small>宣伝として受け取られる</small></div><div className="voice customer"><UserRound /><span>お客様が言う</span><p>選書が素敵。新しい本に出会えました。</p><div className="trust-meter"><i /></div><small>客観的な体験として届く</small></div></div>
      );
    case "negativeDecision":
      return (
        <div className="decision-flow"><div className="decision-start">ネガティブな反応</div><DownArrow /><div className="decision-question">公開回答が必要？</div><div className="decision-branches"><div className="branch no"><span>NO</span><strong>記録してスルー</strong><small>必要なら「いいね」まで</small></div><div className="branch yes"><span>YES</span><strong>社内で事実確認</strong><small>安全・誤情報・個人情報</small></div></div><div className="decision-stop"><ShieldCheck />感情で即返信しない</div></div>
      );
    case "expertiseHub":
      return (
        <div className="hub-visual"><div className="hub-core"><BookOpen /><strong>本・読書</strong></div><div className="hub-item hub-food">食品<span>料理本と</span></div><div className="hub-item hub-stationery">文具<span>読書時間と</span></div><div className="hub-item hub-event">イベント<span>書店体験と</span></div><div className="hub-orbit" /></div>
      );
    case "eventCompare":
      return (
        <div className="event-compare"><div className="event-card flat"><CalendarDays /><span>お知らせ</span><p>今週末、〇〇イベントを開催します。</p><small>日時だけで終わる</small></div><FlowArrow /><div className="event-card vivid"><div className="event-stage"><Store /><Sparkles /></div><span>体験の予告</span><p>書店のど真ん中で、今週末開催します！</p><small>場所・規模・熱量が見える</small></div></div>
      );
    case "vennSummary":
      return (
        <div className="venn"><div className="venn-circle expertise"><BookOpen /><strong>専門性</strong><span>誰に届けるか</span></div><div className="venn-circle continue"><Repeat2 /><strong>継続</strong><span>期待を育てる</span></div><div className="venn-circle talk"><MessageCircle /><strong>会話</strong><span>関係を深める</span></div><div className="venn-center"><Sparkles /><strong>信頼</strong></div></div>
      );
    default:
      return <MiniPost label="X運用研修" text="店舗から、価値ある情報を届ける。" />;
  }
}
