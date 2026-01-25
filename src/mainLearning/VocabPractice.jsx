import React from 'react';
import FloatingContent from './FloatingContent';
import { Volume2, Book, Tag, MessageCircle, Lightbulb, PenTool } from 'lucide-react';
import sampleAudio from '../assets/sample.mp3';
import WaveformPlayer from './WaveformPlayer';
import StrokeOrderAnimation from './StrokeOrderAnimation';
import { useMainLearning } from '../context/MainLearningContext';


// Keep the DB call in a separate function (but in this file, per request)
async function fetchVocab({ level, lessonNumber } = {}) {
  let query = supabase
    .from('Vocabulary')
    .select(
      'id, character, pinyin, definition, example_sentences, part_of_speech, mnemonic, audio_url, level, lesson_number'
    )
    .order('id', { ascending: true });

  if (level != null) query = query.eq('level', level);
  if (lessonNumber != null) query = query.eq('lesson_number', lessonNumber);

  const { data, error } = await query;
  if (error) throw error;

  return (data || []).map((row) => ({
    id: row.id,
    character: row.character,
    pinyin: row.pinyin,
    definition: row.definition,
    example_sentences: row.example_sentences,
    part_of_speech: row.part_of_speech,
    mnemonic: row.mnemonic,
    audio: row.audio_url || null,
  }));
}

const vocabData = [
    {
        id: 1,
        character: "你好",
        pinyin: "Nǐ hǎo",
        definition: `Hello`,
        example_sentences: "你好，最近怎么样？ (Hello, how are you lately?)",
        part_of_speech: "noun",
        mnemonic: "Imagine meeting a friend and saying 'Ni hao!' with a big smile.",
        audio: sampleAudio
    },
    {
        id: 2,
        character: "谢谢",
        pinyin: "Xièxiè",
        definition: "Thank you",
        example_sentences: "谢谢你的帮助。 (Thank you for your help.)",
        part_of_speech: "verb",
        mnemonic: "Picture receiving a gift and saying 'Xie xie!' with gratitude.",
        audio: sampleAudio
    },
    {
        id: 3,
        character: "再见",
        pinyin: "Zàijiàn",
        definition: "Goodbye",
        example_sentences: "我们明天见，再见！ (See you tomorrow, goodbye!)",
        part_of_speech: "adverb",
        mnemonic: "Visualize waving goodbye while saying 'Zai jian!'",
        audio: sampleAudio
    },
    {
        id: 4,
        character: "对不起",
        pinyin: "Duìbùqǐ",
        definition: "Sorry",
        example_sentences: "对不起，我迟到了。 (Sorry, I am late.)",
        part_of_speech: "adjective",
        mnemonic: "Imagine bumping into someone and quickly saying 'Dui bu qi!' to apologize.",
        audio: sampleAudio
    },
    {
        id: 5,
        character: "没关系",
        pinyin: "Méiguānxi",
        definition: "It's okay / No problem",
        example_sentences: "没关系，别放在心上。 (It's okay, don't take it to heart.)",
        part_of_speech: "noun",
        mnemonic: "Picture someone apologizing and you responding with a smile, saying 'Mei guan xi!'",
        audio: sampleAudio
    }
];

const InfoSection = ({ icon: Icon, title, content, color }) => (
    <div className="vocab-section" style={{ 
        marginBottom: '0.5rem', 
        padding: '1rem 0', 
        width: '100%',
        maxWidth: '800px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1.5rem'
    }}>
        <div style={{
            background: color || '#eee',
            padding: '10px',
            borderRadius: '12px',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 4px 10px ${color}40`
        }}>
            <Icon size={24} />
        </div>
        <div style={{ flex: 1 }}>
            <h4 style={{ 
                margin: '0 0 0.4rem 0', 
                color: color || '#888', 
                fontSize: '1rem', 
                textTransform: 'uppercase', 
                letterSpacing: '1.2px', 
                fontWeight: '800' 
            }}>{title}</h4>
            <div style={{ 
                margin: 0, 
                color: '#2d3436', 
                fontSize: '1rem', 
                lineHeight: '1.5', 
                fontWeight: '600',
                letterSpacing: '-0.01em'
            }}>{content}</div>
        </div>
    </div>
);

const VocabItem = ({ item }) => {
    return (
        <div className="vocab-item" style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            height: '100%',
            padding: '2rem 4rem',
            overflowY: 'auto'
        }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem', marginTop: '1rem' }}>
                <h1 style={{ fontSize: '5rem', margin: 0, color: '#333', lineHeight: 1.2 }}>{item.character}</h1>
                <p style={{ fontSize: '2rem', margin: '0rem 0', color: '#4a90e2', fontFamily: 'Arial, sans-serif' }}>{item.pinyin}</p>
            </div>

            <div style={{ width: '100%', maxWidth: '800px', marginBottom: '3rem' }}>
                <WaveformPlayer audioUrl={item.audio || sampleAudio} />
            </div>

            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1rem', paddingBottom: '2rem' }}>
                <InfoSection icon={Book} title="Definition" content={item.definition} color="#4a90e2" />
                <InfoSection icon={Tag} title="Part of Speech (Grammer)" content={item.part_of_speech} color="#ff9f43" />
                <InfoSection icon={MessageCircle} title="Example Sentences" content={item.example_sentences} color="#2ed573" />
                {item.mnemonic && <InfoSection icon={Lightbulb} title="Mnemonic" content={item.mnemonic} color="#8207acff" />}
                
                <div style={{ width: '100%', marginTop: '1rem' }}>
                    <InfoSection 
                        icon={PenTool} 
                        title="Practice Your Writing" 
                        content={
                            <div>
                                <p style={{ margin: '0 0 1rem 0', fontWeight: 'normal', color: '#666' }}>Watch the animation of the characters. Learn how to write it slowly.</p>
                                <StrokeOrderAnimation text={item.character} />
                            </div>
                        } 
                        color="#ff6b6b" 
                    />
                </div>
            </div>
        </div>
    );
};

export default function VocabPractice({ level, lessonNumber }) {
    const { vocabItems, vocabLoading, vocabError } = useMainLearning();
    const itemsToRender = vocabItems && vocabItems.length > 0 ? vocabItems : vocabData;

//   if (vocabLoading) return <div style={{ padding: '1rem' }}>Loading vocabulary…</div>;
//   if (vocabError) return <div style={{ padding: '1rem', color: '#c0392b' }}>{vocabError}</div>;

//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [errorText, setErrorText] = useState('');

//   useEffect(() => {
//     let cancelled = false;

//     async function load() {
//       setLoading(true);
//       setErrorText('');
//       try {
//         const data = await fetchVocab({ level, lessonNumber });
//         if (!cancelled) setItems(data);
//       } catch (e) {
//         if (!cancelled) setErrorText(e?.message || 'Failed to load vocabulary.');
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     }

//     load();
//     return () => {
//       cancelled = true;
//     };
//   }, [level, lessonNumber]);

//   if (loading) return <div style={{ padding: '1rem' }}>Loading vocabulary…</div>;
//   if (errorText) return <div style={{ padding: '1rem', color: '#c0392b' }}>{errorText}</div>;

    return (
        <div style={{ height: '100%' }}>
            <FloatingContent 
                title="Vocabulary Practice"
                items={itemsToRender}
                renderItem={(item) => <VocabItem key={item.id} item={item} />}
                cardClassName="vocab-card-wide"
            />
        </div>
    );
}
