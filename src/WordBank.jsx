import { useState } from 'react'
import { Search } from 'lucide-react'
import './css/App.css'

function WordBank() {
  const [searchTerm, setSearchTerm] = useState('')

  const initialWords = [
    { char: '你好', pinyin: 'nǐ hǎo', defCN: '问候语，表示问候', defEN: 'Hello; Hi' },
    { char: '学习', pinyin: 'xué xí', defCN: '通过阅读、听讲、研究、实践等获得知识或技能', defEN: 'Study; Learn' },
    { char: '朋友', pinyin: 'péng you', defCN: '彼此有交情的人', defEN: 'Friend' },
    { char: '谢谢', pinyin: 'xiè xie', defCN: '对别人的好意表示感激', defEN: 'Thank you' },
    { char: '猫', pinyin: 'māo', defCN: '一种由于其捕鼠能力或作为宠物而被人类饲养的哺乳动物', defEN: 'Cat' },
    { char: '书', pinyin: 'shū', defCN: '装订成册的著作', defEN: 'Book' },
    { char: '水', pinyin: 'shuǐ', defCN: '一种无色、无臭、透明的液体', defEN: 'Water' },
    { char: '快乐', pinyin: 'kuài lè', defCN: '感到幸福或满意', defEN: 'Happy' },
    { char: '家', pinyin: 'jiā', defCN: '家庭的住所', defEN: 'Home; Family' },
    { char: '学校', pinyin: 'xué xiào', defCN: '教育学生的场所', defEN: 'School' },
    { char: '工作', pinyin: 'gōng zuò', defCN: '从事体力或脑力劳动', defEN: 'Work; Job' },
    { char: '爱', pinyin: 'ài', defCN: '对人或事物有很深的感情', defEN: 'Love' },
    { char: '时间', pinyin: 'shí jiān', defCN: '物质运动延续的广度', defEN: 'Time' },
    { char: '钱', pinyin: 'qián', defCN: '货币', defEN: 'Money' },
    { char: '吃', pinyin: 'chī', defCN: '把食物咽下去', defEN: 'Eat' },
  ]

  const filteredWords = initialWords.filter(word => 
    word.char.includes(searchTerm) || 
    word.pinyin.includes(searchTerm.toLowerCase()) || 
    word.defEN.toLowerCase().includes(searchTerm.toLowerCase()) ||
    word.defCN.includes(searchTerm)
  )

  return (
    <div className="wordbank-container">
      <div className="wordbank-header">
         <h2>My Word Bank</h2>
         <span className="word-count">{filteredWords.length} words collected</span>
      </div>

      <div className="wordbank-search">
         <Search className="search-icon" size={20} />
         <input 
            type="text" 
            placeholder="Search by character, pinyin, or meaning..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
         />
      </div>

      <div className="wordbank-table-container">
        <table className="wordbank-table">
          <thead>
            <tr>
              <th width="15%">Character</th>
              <th width="20%">Pinyin</th>
              <th width="32.5%">Definition (CN)</th>
              <th width="32.5%">Definition (EN)</th>
            </tr>
          </thead>
          <tbody>
            {filteredWords.map((word, index) => (
              <tr key={index}>
                <td className="char-cell">{word.char}</td>
                <td className="pinyin-cell">{word.pinyin}</td>
                <td className="def-cell">{word.defCN}</td>
                <td className="def-cell">{word.defEN}</td>
              </tr>
            ))}
            {filteredWords.length === 0 && (
                <tr>
                    <td colSpan="4" className="empty-state">No words found matching "{searchTerm}"</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default WordBank
