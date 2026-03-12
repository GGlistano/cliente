import { useState, useEffect } from 'react';
import { Play, Download, MessageCircle, CheckCircle, ChevronDown, ChevronRight, Award, Lock } from 'lucide-react';
import VideoLesson from './VideoLesson';

interface Lesson {
  id: number;
  title: string;
  playerId: string;
  scriptSrc: string;
  module: number;
  thumbnail?: string;
  description?: string;
}

interface Module {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const lessons: Lesson[] = [
  {
    id: 1,
    title: 'Aula 1',
    playerId: 'vid-69b1ace93e201d76893d875d',
    scriptSrc: 'https://scripts.converteai.net/9d93e4b2-3654-4bea-bda0-107c1328d520/players/69b1ace93e201d76893d875d/v4/player.js',
    module: 1,
    description: 'Introdução ao curso',
  },
  {
    id: 2,
    title: 'Aula 2',
    playerId: 'vid-69b1ac25011455be91e418aa',
    scriptSrc: 'https://scripts.converteai.net/9d93e4b2-3654-4bea-bda0-107c1328d520/players/69b1ac25011455be91e418aa/v4/player.js',
    module: 1,
    description: 'Fundamentos essenciais',
  },
  {
    id: 3,
    title: 'Aula 3',
    playerId: 'vid-69b1acb04e2d745440682f94',
    scriptSrc: 'https://scripts.converteai.net/9d93e4b2-3654-4bea-bda0-107c1328d520/players/69b1acb04e2d745440682f94/v4/player.js',
    module: 1,
    description: 'Primeiros passos práticos',
  },
  {
    id: 4,
    title: 'Aula 1',
    playerId: 'vid-690e0b5397f939cb40d39a6f',
    scriptSrc: 'https://scripts.converteai.net/9d93e4b2-3654-4bea-bda0-107c1328d520/players/690e0b5397f939cb40d39a6f/v4/player.js',
    module: 2,
    description: 'Técnicas avançadas',
  },
  {
    id: 5,
    title: 'Aula 2',
    playerId: 'vid-690de20c19eaa3a949e81cdc',
    scriptSrc: 'https://scripts.converteai.net/9d93e4b2-3654-4bea-bda0-107c1328d520/players/690de20c19eaa3a949e81cdc/v4/player.js',
    module: 2,
    description: 'Estratégias de implementação',
  },
  {
    id: 6,
    title: 'Aula 3',
    playerId: 'vid_690de3c67ee544f7b996720d',
    scriptSrc: 'https://scripts.converteai.net/9d93e4b2-3654-4bea-bda0-107c1328d520/players/690de3c67ee544f7b996720d/player.js',
    thumbnail: 'https://images.converteai.net/9d93e4b2-3654-4bea-bda0-107c1328d520/players/690de3c67ee544f7b996720d/thumbnail.jpg',
    module: 2,
    description: 'Otimização e resultados',
  },
  {
    id: 7,
    title: 'Aula 4',
    playerId: 'vid-690de30c19eaa3a949e81de4',
    scriptSrc: 'https://scripts.converteai.net/9d93e4b2-3654-4bea-bda0-107c1328d520/players/690de30c19eaa3a949e81de4/v4/player.js',
    module: 2,
    description: 'Casos práticos',
  },
  {
    id: 8,
    title: 'Aula 5',
    playerId: 'vid-690e06e7230c7d2caf61da1d',
    scriptSrc: 'https://scripts.converteai.net/9d93e4b2-3654-4bea-bda0-107c1328d520/players/690e06e7230c7d2caf61da1d/v4/player.js',
    module: 2,
    description: 'Automação completa',
  },
  {
    id: 9,
    title: 'Aula 6',
    playerId: 'vid-690e071e3ad3bcc011d8e45e',
    scriptSrc: 'https://scripts.converteai.net/9d93e4b2-3654-4bea-bda0-107c1328d520/players/690e071e3ad3bcc011d8e45e/v4/player.js',
    module: 2,
    description: 'Escalando seus resultados',
  },
];

const modules: Module[] = [
  {
    id: 1,
    title: 'Módulo 1 - Fundamentos',
    description: 'Aprenda os conceitos essenciais e comece sua jornada',
    icon: '🎯'
  },
  {
    id: 2,
    title: 'Módulo 2 - Avançado',
    description: 'Domine técnicas avançadas e estratégias profissionais',
    icon: '🚀'
  },
];

export default function MembersArea() {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [expandedModules, setExpandedModules] = useState<number[]>([1]);

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

  const toggleModule = (moduleId: number) => {
    setExpandedModules(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const getModuleProgress = (moduleId: number) => {
    const moduleLessons = lessons.filter(l => l.module === moduleId);
    const completed = moduleLessons.filter(l => completedLessons.includes(l.id)).length;
    return { completed, total: moduleLessons.length, percentage: (completed / moduleLessons.length) * 100 };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Área de Membros</h1>
          <p className="text-slate-600">Continue sua jornada de aprendizado</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {selectedLesson ? (
              <>
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">
                        {modules.find(m => m.id === selectedLesson.module)?.title}
                      </span>
                    </div>
                    <h2 className="text-3xl font-bold">{selectedLesson.title}</h2>
                    {selectedLesson.description && (
                      <p className="text-blue-100 mt-2">{selectedLesson.description}</p>
                    )}
                  </div>
                  <div className="p-6">
                    <VideoLesson lesson={selectedLesson} />
                  </div>
                  <div className="px-6 pb-6">
                    <button
                      onClick={() => toggleLessonComplete(selectedLesson.id)}
                      className={`w-full py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                        completedLessons.includes(selectedLesson.id)
                          ? 'bg-green-100 text-green-700 border-2 border-green-300'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      <CheckCircle className="w-5 h-5" />
                      {completedLessons.includes(selectedLesson.id) ? 'Aula Concluída' : 'Marcar como Concluída'}
                    </button>
                  </div>
                </div>

                {selectedLesson.module === 1 && (
                  <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-xl p-8 text-white">
                    <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                      <MessageCircle className="w-6 h-6" />
                      Junte-se à Comunidade
                    </h3>
                    <p className="mb-6 text-emerald-50">
                      Conecte-se com outros alunos, tire dúvidas e compartilhe sua evolução no grupo exclusivo do WhatsApp!
                    </p>
                    <a
                      href="https://chat.whatsapp.com/ERG5u5MOfOJLpLD9qq955Q?mode=wwt"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-3 bg-white text-emerald-600 font-bold py-4 px-8 rounded-xl transition-all duration-200 hover:shadow-2xl hover:scale-105"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Entrar no Grupo WhatsApp
                    </a>
                  </div>
                )}

                {selectedLesson.module === 2 && (
                  <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
                    <h3 className="text-2xl font-bold text-slate-800 mb-6">Links Importantes</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <a
                        href="https://play.google.com/store/apps/details?id=us.current.android"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                      >
                        <Download className="w-5 h-5" />
                        Baixar Aplicativo
                      </a>
                      <a
                        href="https://chat.whatsapp.com/ERG5u5MOfOJLpLD9qq955Q?mode=wwt"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                      >
                        <MessageCircle className="w-5 h-5" />
                        Grupo WhatsApp
                      </a>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-slate-200">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Play className="w-10 h-10 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-3">Bem-vindo ao Curso!</h2>
                <p className="text-slate-600 mb-6">
                  Selecione um módulo e comece a assistir as aulas para iniciar sua jornada de aprendizado.
                </p>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-200 sticky top-8">
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold text-slate-800">Seu Progresso</h3>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-700">Conclusão Total</span>
                  <span className="text-2xl font-bold text-blue-600">
                    {Math.round((completedLessons.length / lessons.length) * 100)}%
                  </span>
                </div>
                <div className="bg-white rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-blue-500 h-full transition-all duration-500 rounded-full"
                    style={{ width: `${(completedLessons.length / lessons.length) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-slate-600 mt-2">
                  {completedLessons.length} de {lessons.length} aulas concluídas
                </p>
              </div>

              <div className="space-y-3">
                {modules.map((module) => {
                  const moduleLessons = lessons.filter(l => l.module === module.id);
                  const progress = getModuleProgress(module.id);
                  const isExpanded = expandedModules.includes(module.id);
                  const isCompleted = progress.completed === progress.total;

                  return (
                    <div key={module.id} className="border-2 border-slate-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-blue-300">
                      <button
                        onClick={() => toggleModule(module.id)}
                        className="w-full p-4 bg-gradient-to-r from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-200 transition-all duration-200"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{module.icon}</span>
                            <div className="text-left">
                              <h4 className="font-bold text-slate-800 text-sm">{module.title}</h4>
                              <p className="text-xs text-slate-600">{module.description}</p>
                            </div>
                          </div>
                          {isExpanded ? (
                            <ChevronDown className="w-5 h-5 text-slate-600" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-slate-600" />
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-slate-200 rounded-full h-2">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                isCompleted ? 'bg-green-500' : 'bg-blue-600'
                              }`}
                              style={{ width: `${progress.percentage}%` }}
                            />
                          </div>
                          <span className="text-xs font-semibold text-slate-600">
                            {progress.completed}/{progress.total}
                          </span>
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="bg-white p-2 space-y-1">
                          {moduleLessons.map((lesson, index) => {
                            const isSelected = selectedLesson?.id === lesson.id;
                            const isLessonCompleted = completedLessons.includes(lesson.id);

                            return (
                              <button
                                key={lesson.id}
                                onClick={() => setSelectedLesson(lesson)}
                                className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                                  isSelected
                                    ? 'bg-blue-600 text-white shadow-lg scale-[1.02]'
                                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className={`flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 ${
                                    isSelected
                                      ? 'bg-white/20'
                                      : isLessonCompleted
                                      ? 'bg-green-100'
                                      : 'bg-slate-200'
                                  }`}>
                                    {isLessonCompleted ? (
                                      <CheckCircle className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-green-600'}`} />
                                    ) : (
                                      <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-600'}`}>
                                        {index + 1}
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className={`font-semibold text-sm ${isSelected ? 'text-white' : 'text-slate-800'}`}>
                                      {lesson.title}
                                    </p>
                                    {lesson.description && (
                                      <p className={`text-xs truncate ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                                        {lesson.description}
                                      </p>
                                    )}
                                  </div>
                                  <Play className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
