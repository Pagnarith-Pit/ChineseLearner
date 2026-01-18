import React, { useState } from 'react';
import FloatingContent from './FloatingContent';
import { Eye, EyeOff } from 'lucide-react';

const readingData = [
  {
      id: 1,
      title: "The Little Horse Crosses the River",
      chinese: "小马过河 (Xiǎo mǎ guò hé)",
      content: "小马要过河，老牛说水很浅，松鼠说水很深。小马试了试，原来水既不像老牛说的那样浅，也不像松鼠说的那样深。",
      pinyin: "Xiǎo mǎ yào guò hé, lǎo niú shuō shuǐ hěn qiǎn, sōngshǔ shuō shuǐ hěn shēn. Xiǎo mǎ shì le shì, yuánlái shuǐ jì bù xiàng lǎo niú shuō de nàyàng qiǎn, yě bù xiàng sōngshǔ shuō de nàyàng shēn.",
      question: "Why did the cow say the river was shallow?",
      answer: "Because it has short legs."
  },
  {
      id: 2,
      title: "Buying Fruit",
      chinese: "买水果 (Mǎi shuǐguǒ)",
      content: "今天我去超市买了一些苹果和香蕉。苹果很红，香蕉很黄。它们都很新鲜。",
      pinyin: "Jīntiān wǒ qù chāoshì mǎi le yīxiē píngguǒ hé xiāngjiāo. Píngguǒ hěn hóng, xiāngjiāo hěn huáng. Tāmen dōu hěn xīnxiān.",
      question: "What did the narrator buy?",
      answer: "Apples and bananas."

  },
  {
      id: 3,
      title: "My Hobbies",
      chinese: "我的爱好 (Wǒ de àihào)",
      content: "我有很多爱好。我喜欢看书，听音乐，还喜欢踢足球。周末的时候，我经常和朋友去公园踢球。",
      pinyin: "Wǒ yǒu hěnduō àihào. Wǒ xǐhuān kànshū, tīng yīnyuè, hái xǐhuān tī zúqiú. Zhōumò de shíhòu, wǒ jīngcháng hé péngyǒu qù gōngyuán tī qiú.",
      question: "What does the narrator do on weekends?",
      answer: "Plays football with friends in the park."
  },
];

const PracticeItem = ({ item }) => {
    const [submitted, setSubmitted] = useState(false);
    const [userInput, setUserInput] = useState("");
    const [showPinyin, setShowPinyin] = useState(false);

    return (
        <div className="practice-item">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0 }}>{item.title} - {item.chinese}</h3>
                <button 
                  onClick={() => setShowPinyin(!showPinyin)}
                  style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      background: 'none',
                      border: '1px solid #ddd',
                      padding: '0.5rem 1rem',
                      borderRadius: '20px',
                      cursor: 'pointer',
                      color: '#666',
                      fontSize: '0.9rem'
                  }}
                >
                  {showPinyin ? <EyeOff size={16} /> : <Eye size={16} />}
                  {showPinyin ? "Hide Pinyin" : "Show Pinyin"}
                </button>
            </div>
          
            <div className="reading-content" style={{ 
                background: '#f9f9f9', 
                padding: '2rem', 
                borderRadius: '8px', 
                fontSize: '1.2rem',
                lineHeight: '1.8',
                marginBottom: '2rem',
                borderLeft: '4px solid #fbc02d'
            }}>
                <p style={{ margin: 0 }}>{item.content}</p>
                {showPinyin && (
                    <p style={{ marginTop: '1rem', color: '#666', fontSize: '1rem', borderTop: '1px dashed #ddd', paddingTop: '1rem' }}>{item.pinyin}</p>
                )}
            </div>

            <div className="comprehension-section">
                <h4>Comprehension Check</h4>
                <p style={{ fontWeight: '500', marginBottom: '1rem' }}>{item.question}</p>
                <textarea 
                    rows="3" 
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px solid #ccc' }}
                    placeholder="Type your answer here..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                />

                <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-start'}}>
                     <button 
                        onClick={() => setSubmitted(true)}
                        disabled={submitted}
                        style={{
                            padding: '0.6rem 1.5rem',
                            backgroundColor: submitted ? '#ccc' : '#4a90e2',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: submitted ? 'default' : 'pointer',
                            fontSize: '1rem',
                            fontWeight: '500',
                            transition: 'background-color 0.2s'
                        }}
                    >
                        {submitted ? 'Submitted' : 'Submit'}
                    </button>
                </div>

                {submitted && (
                    <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#f9f9f9', borderRadius: '8px', animation: 'fadeIn 0.5s ease-in' }}>
                        <div style={{ marginBottom: '2rem' }}>
                            <p style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#2c3e50', margin: '0 0 0.5rem 0', textTransform: 'uppercase' }}>Your Input</p>
                            <p style={{ fontSize: '1.1rem', margin: '0', color: '#333' }}>{userInput || 'No input provided'}</p>
                        </div>
                        <p style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#2c3e50', margin: '0 0 0.5rem 0', textTransform: 'uppercase' }}>Correct Answer</p>
                        <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#333' }}>{item.answer}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default function ReadingPractice({ topic }) {
  const renderItem = (item) => (
      <PracticeItem key={item.id} item={item} />
  );

  return (
    <div style={{ height: '100%' }}>
        <style>{`
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `}</style>
        <FloatingContent 
            title={`Reading Practice`}
            items={readingData}
            renderItem={renderItem}
        />
    </div>
  );
}

