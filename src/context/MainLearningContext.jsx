import { createContext, useContext, useMemo, useState } from 'react'
// Supabase-ready imports (uncomment when Supabase is configured)
// import { useEffect } from 'react'
// import { useSupabase } from './SupabaseProvider'

const MainLearningContext = createContext(null)

export function MainLearningProvider({ level, lessonNumber, children }) {
  const [vocabItems, setVocabItems] = useState([])
  const [vocabLoading, setVocabLoading] = useState(false)
  const [vocabError, setVocabError] = useState('')

  // Supabase-ready fetch helper (uncomment when Supabase is configured)
  // const fetchVocabulary = async (supabaseClient, lvl, lessonNo) => {
  //   let query = supabaseClient
  //     .from('Vocabulary')
  //     .select(
  //       'id, character, pinyin, definition, example_sentences, part_of_speech, mnemonic, audio_url, level, lesson_number'
  //     )
  //     .order('id', { ascending: true })
  //
  //   if (lvl != null) query = query.eq('level', lvl)
  //   if (lessonNo != null) query = query.eq('lesson_number', lessonNo)
  //
  //   const { data, error } = await query
  //   if (error) throw error
  //
  //   return (data || []).map((row) => ({
  //     id: row.id,
  //     character: row.character,
  //     pinyin: row.pinyin,
  //     definition: row.definition,
  //     example_sentences: row.example_sentences,
  //     part_of_speech: row.part_of_speech,
  //     mnemonic: row.mnemonic,
  //     audio: row.audio_url || null,
  //   }))
  // }

  // Supabase-ready effect (uncomment when Supabase is configured)
  // const { supabase, loading: authLoading } = useSupabase()
  // useEffect(() => {
  //   let isMounted = true
  //
  //   const load = async () => {
  //     setVocabLoading(true)
  //     setVocabError('')
  //     try {
  //       const data = await fetchVocabulary(supabase, level, lessonNumber)
  //       if (!isMounted) return
  //       setVocabItems(data)
  //     } catch (error) {
  //       if (!isMounted) return
  //       console.error('Failed to load vocabulary', error)
  //       setVocabError('Unable to load vocabulary right now.')
  //       setVocabItems([])
  //     } finally {
  //       if (!isMounted) return
  //       setVocabLoading(false)
  //     }
  //   }
  //
  //   if (!authLoading) {
  //     load()
  //   }
  //
  //   return () => {
  //     isMounted = false
  //   }
  // }, [level, lessonNumber, supabase, authLoading])

  const value = useMemo(() => {
    return {
      vocabItems,
      vocabLoading,
      vocabError,
      setVocabItems,
    }
  }, [vocabItems, vocabLoading, vocabError])

  return <MainLearningContext.Provider value={value}>{children}</MainLearningContext.Provider>
}

export function useMainLearning() {
  const context = useContext(MainLearningContext)
  if (!context) {
    throw new Error('useMainLearning must be used within a MainLearningProvider')
  }
  return context
}
