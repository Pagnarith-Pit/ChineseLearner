import React, { useState } from 'react';
import FloatingContent from './FloatingContent';
import { Volume2 } from 'lucide-react';
import sampleAudio from '../assets/sample.mp3';
import WaveformPlayer from './WaveformPlayer';

const vocabData = [
    {
        id: 1,
        character: "你好",
        pinyin: "Nǐ hǎo",
        definition: "Hello",
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

const InfoSection = ({ title, content }) => (
    <div className="vocab-section" style={{ 
        marginBottom: '0.5rem', 
        padding: '1rem 0', 
        width: '100%',
        maxWidth: '800px',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
    }}>
        <div style={{ flex: 1 }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#888', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>{title}</h4>
            <p style={{ margin: 0, color: '#333', fontSize: '1.1rem', lineHeight: '1.5' }}>{content}</p>
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
                <InfoSection title="Definition" content={item.definition} />
                <InfoSection title="Part of Speech" content={item.part_of_speech} />
                <InfoSection title="Example Sentences" content={item.example_sentences} />
                {item.mnemonic && <InfoSection title="Mnemonic" content={item.mnemonic} />}
            </div>
        </div>
    );
};

export default function VocabPractice() {
    return (
        <div style={{ height: '100%' }}>
            <FloatingContent 
                title="Vocabulary Practice"
                items={vocabData}
                renderItem={(item) => <VocabItem key={item.id} item={item} />}
                cardClassName="vocab-card-wide"
            />
        </div>
    );
}
