import React from 'react';
import FloatingContent from './FloatingContent';

const readingData = [
  {
      id: 1,
      title: "The Little Horse Crosses the River",
      chinese: "小马过河 (Xiǎo mǎ guò hé)",
      content: "小马要过河，老牛说水很浅，松鼠说水很深。小马试了试，原来水既不像老牛说的那样浅，也不像松鼠说的那样深。",
      question: "Why did the cow say the river was shallow?",
      answer: "Because it has short legs."
  },
  {
      id: 2,
      title: "Buying Fruit",
      chinese: "买水果 (Mǎi shuǐguǒ)",
      content: "今天我去超市买了一些苹果和香蕉。苹果很红，香蕉很黄。它们都很新鲜。",
      question: "What did the narrator buy?",
      answer: "Apples and bananas."

  },
  {
      id: 3,
      title: "My Hobbies",
      chinese: "我的爱好 (Wǒ de àihào)",
      content: "我有很多爱好。我喜欢看书，听音乐，还喜欢踢足球。周末的时候，我经常和朋友去公园踢球。",
      question: "What does the narrator do on weekends?",
      answer: "Plays football with friends in the park."
  },
];

export default function ReadingPractice({ topic }) {
  const renderItem = (item) => (
      <div className="practice-item">
          <h3>{item.title} - {item.chinese}</h3>
          
          <div className="reading-content" style={{ 
              background: '#f9f9f9', 
              padding: '2rem', 
              borderRadius: '8px', 
              fontSize: '1.2rem',
              lineHeight: '1.8',
              marginBottom: '2rem',
              borderLeft: '4px solid #fbc02d'
          }}>
              {item.content}
          </div>

          <div className="comprehension-section">
              <h4>Comprehension Check</h4>
              <p style={{ fontWeight: '500', marginBottom: '1rem' }}>{item.question}</p>
              <textarea 
                  rows="3" 
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px solid #ccc' }}
                  placeholder="Type your answer here..."
              />
          </div>
      </div>
  );

  return (
    <div style={{ height: '100%' }}>
        <FloatingContent 
            title={`Reading Pratice`}
            items={readingData}
            renderItem={renderItem}
        />
    </div>
  );
}

