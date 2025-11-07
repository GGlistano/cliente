import { useState, useEffect } from 'react';
import { Play, Download, MessageCircle, CheckCircle } from 'lucide-react';
import VideoLesson from './VideoLesson';

const lessons = [
  {
    id: 1,
    title: 'Aula 1',
    playerId: 'vid-690e0b5397f939cb40d39a6f',
    scriptSrc: 'https://scripts.converteai.net/9d93e4b2-3654-4bea-bda0-107c1328d520/players/690e0b5397f939cb40d39a6f/v4/player.js',
  },
  {
    id: 2,
    title: 'Aula 2',
    playerId: 'vid-690de20c19eaa3a949e81cdc',
    scriptSrc: 'https://scripts.converteai.net/9d93e4b2-3654-4bea-bda0-107c1328d520/players/690de20c19eaa3a949e81cdc/v4/player.js',
  },
  {
    id: 3,
    title: 'Aula 3',
    playerId: 'vid_690de3c67ee544f7b996720d',
    scriptSrc: 'https://scripts.converteai.net/9d93e4b2-3654-4bea-bda0-107c1328d520/players/690de3c67ee544f7b996720d/player.js',
    thumbnail: 'https://images.converteai.net/9d93e4b2-3654-4bea-bda0-107c1328d520/players/690de3c67ee544f7b996720d/thumbnail.jpg',
  },
  {
    id: 4,
    title: 'Aula 4',
    playerId: 'vid-690de30c19eaa3a949e81de4',
    scriptSrc: 'https://scripts.converteai.net/9d93e4b2-3654-4bea-bda0-107c1328d520/players/690de30c19eaa3a949e81de4/v4/player.js',
  },
  {
    id: 5,
    title: 'Aula 5',
    playerId: 'vid-690e06e7230c7d2caf61da1d',
    scriptSrc: 'https://scripts.converteai.net/9d93e4b2-3654-4bea-bda0-107c1328d520/players/690e06e7230c7d2caf61da1d/v4/player.js',
  },
  {
    id: 6,
    title: 'Aula 6',
    playerId: 'vid-690e071e3ad3bcc011d8e45e',
    scriptSrc: 'https://scripts.converteai.net/9d93e4b2-3654-4bea-bda0-107c1328d520/players/690e071e3ad3bcc011d8e45e/v4/player.js',
  },
];

export default function MembersArea() {
  const [selectedLesson, setSelectedLesson] = useState(lessons[0]);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('completedLessons');
    if (saved) {
      setCompletedLessons(JSON.parse(saved));
    }
  }, []);

  const toggleLessonComplete = (lessonId: number) => {
    const updated = completedLessons.includes(lessonId)
      ? completedLessons.filter(id => id !== lessonId)
      : [...completedLessons, lessonId];
    setCompletedLessons(updated);
    localStorage.setItem('completedLessons', JSON.stringify(updated));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-2xl font-bold text-slate-800">{selectedLesson.title}</h2>
            </div>
            <div className="p-6">
              <VideoLesson lesson={selectedLesson} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Links Importantes</h3>
            {selectedLesson.id === 1 ? (
              <a
                href="https://chat.whatsapp.com/ERG5u5MOfOJLpLD9qq955Q?mode=wwt"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-xl w-full"
              >
                <MessageCircle className="w-5 h-5" />
                Entrar no Grupo WhatsApp
              </a>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href="https://play.google.com/store/apps/details?id=us.current.android"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-xl"
                >
                  <Download className="w-5 h-5" />
                  Baixar Aplicativo
                </a>
                <a
                  href="https://chat.whatsapp.com/ERG5u5MOfOJLpLD9qq955Q?mode=wwt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-xl"
                >
                  <MessageCircle className="w-5 h-5" />
                  Entrar no Grupo WhatsApp
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 sticky top-8">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Módulos do Curso</h3>
            <div className="space-y-2">
              {lessons.map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => setSelectedLesson(lesson)}
                  className={`w-full text-left p-4 rounded-lg transition-all duration-200 border-2 ${
                    selectedLesson.id === lesson.id
                      ? 'bg-blue-50 border-blue-500 shadow-sm'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                        selectedLesson.id === lesson.id ? 'bg-blue-500' : 'bg-slate-300'
                      }`}>
                        <Play className={`w-5 h-5 ${
                          selectedLesson.id === lesson.id ? 'text-white' : 'text-slate-600'
                        }`} />
                      </div>
                      <span className={`font-semibold ${
                        selectedLesson.id === lesson.id ? 'text-blue-700' : 'text-slate-700'
                      }`}>
                        {lesson.title}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLessonComplete(lesson.id);
                      }}
                      className={`p-1 rounded-full transition-colors ${
                        completedLessons.includes(lesson.id)
                          ? 'text-green-600'
                          : 'text-slate-300 hover:text-slate-500'
                      }`}
                    >
                      <CheckCircle className="w-6 h-6" />
                    </button>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-slate-200">
              <div className="text-center">
                <p className="text-sm text-slate-600 mb-2">Progresso do Curso</p>
                <div className="flex items-center justify-center gap-2">
                  <div className="flex-1 bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(completedLessons.length / lessons.length) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-slate-700">
                    {completedLessons.length}/{lessons.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
