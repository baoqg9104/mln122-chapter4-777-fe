import { useState } from 'react';
import { ChevronRight, Building2, TrendingUp, Globe, Users, BookOpen, AlertCircle, CheckCircle, XCircle, ArrowRight, Download, Sparkles, Bot, Zap, Target, TrendingDown, DollarSign, Factory, Award, Scale, Shield } from 'lucide-react';

const App = () => {
  const [activeSection, setActiveSection] = useState('intro');

  const sections = [
    { id: 'intro', title: 'Giới thiệu', icon: BookOpen, color: 'from-purple-500 to-pink-500' },
    { id: '4.1', title: '4.1. Cạnh tranh độc quyền', icon: TrendingUp, color: 'from-blue-500 to-cyan-500' },
    { id: '4.2', title: '4.2. Lý luận Lênin', icon: Users, color: 'from-red-500 to-orange-500' },
    { id: '4.3.1', title: '4.3.1. Biểu hiện mới độc quyền', icon: Globe, color: 'from-green-500 to-teal-500' },
    { id: '4.3.2', title: '4.3.2. Độc quyền nhà nước', icon: Building2, color: 'from-indigo-500 to-purple-500' },
    { id: 'case', title: 'Tình huống Hàn Quốc', icon: AlertCircle, color: 'from-yellow-500 to-orange-500' }
  ];

  const [downloadState, setDownloadState] = useState<'idle' | 'pending' | 'done'>('idle');
  const [downloadNote, setDownloadNote] = useState<string>('');

  const handleDownload = async () => {
    // Play all notes in sequence so the user reads each one before download starts
    const notes = [
      'Đang đóng gói tài liệu bí mật... 🕵️‍♂️',
      'Xin chờ — đang cho tài liệu uống cà phê để tỉnh táo ☕',
      'Đếm ngược... 3, 2, 1... Tải ngay! 🚀',
      'Đề thi trong đây 👀 (suỵttt!)',
      'Học ngay để lấy 10 điểm! 🎓'
    ];

    setDownloadState('pending');

    // show each note for a short duration (milliseconds)
    const showMs = 1500;
    for (const note of notes) {
      setDownloadNote(note);
      // wait so the user can read
      await new Promise((res) => setTimeout(res, showMs));
    }

    // after cycling notes, start the download
    const url = '/materials.pdf';
    try {
      const res = await fetch(url);
      if (!res.ok) {
        window.open(url, '_blank');
        setDownloadState('done');
        setTimeout(() => setDownloadState('idle'), 1800);
        return;
      }
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = 'Cửu âm chân kinh.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(blobUrl);
      setDownloadState('done');
      setTimeout(() => setDownloadState('idle'), 1800);
    } catch {
      // final fallback: open the file URL
      window.open(url, '_blank');
      setDownloadState('done');
      setTimeout(() => setDownloadState('idle'), 1800);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">

      {/* Playful download toast/overlay — appears while a download is pending/done */}
      {downloadState !== 'idle' && (
        <div className="fixed right-6 bottom-6 z-50">
          <div role="status" aria-live="polite" className="max-w-md w-96 bg-white/95 backdrop-blur-md text-slate-900 rounded-2xl shadow-xl p-6 flex items-center gap-4 transform scale-105">
            <div className="text-3xl md:text-4xl">{downloadState === 'pending' ? '⏳' : '✅'}</div>
            <div>
              <div className="text-lg md:text-xl font-semibold mb-1">{downloadState === 'pending' ? 'Chuẩn bị tải...' : 'Đã sẵn sàng'}</div>
              <div className="text-base md:text-lg text-slate-700 leading-relaxed">{downloadNote}</div>
            </div>
          </div>
        </div>
      )}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <header className="relative bg-gradient-to-r from-red-600 via-red-700 to-orange-600 text-white shadow-2xl border-b-4 border-yellow-400">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 py-8 relative">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm p-3 rounded-xl">
                <Sparkles className="text-yellow-300" size={40} />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">
                  Kinh tế Chính trị Mác - Lênin
                </h1>
                <p className="text-red-100 text-lg flex items-center gap-2">
                  <Target size={20} />
                  Cạnh tranh và Độc quyền trong Nền kinh tế Thị trường
                </p>
              </div>
            </div>
            <button
              onClick={handleDownload}
              className=" cursor-pointer bg-white text-red-600 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-yellow-300 hover:text-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Download size={20} />
              Tải tài liệu bí mật
            </button>
          </div>
        </div>
      </header>

      <nav className="sticky top-0 z-50 bg-white bg-opacity-95 backdrop-blur-md shadow-lg border-b-2 border-purple-200">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto py-4 gap-3">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl whitespace-nowrap transition-all duration-300 transform hover:scale-105 ${activeSection === section.id
                    ? `bg-gradient-to-r ${section.color} text-white shadow-lg scale-105`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  <Icon size={20} />
                  <span className="font-semibold">{section.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12 relative">
        {activeSection === 'intro' && (
          <div className="space-y-8">
            <div className="relative bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl shadow-2xl p-8 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white bg-opacity-10 rounded-full -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-400 bg-opacity-10 rounded-full -ml-24 -mb-24"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-white bg-opacity-20 backdrop-blur-sm p-4 rounded-2xl">
                    <BookOpen className="text-blue-500" size={48} />
                  </div>
                  <h2 className="text-4xl font-bold text-white">Giới thiệu Tổng quan</h2>
                </div>
                <p className="text-white text-lg leading-relaxed">
                  Nghiên cứu về <strong>Độc quyền và Độc quyền nhà nước</strong> trong kinh tế thị trường dựa theo tư tưởng Mác - Lênin, phân tích sâu sắc các khía cạnh kinh tế - chính trị - xã hội.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="group bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-red-500">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-gradient-to-br from-red-500 to-orange-500 p-3 rounded-xl group-hover:scale-110 transition-transform">
                    <Factory className="text-white" size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Khái niệm Độc quyền</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg mb-4">
                  Độc quyền là khi một số ít doanh nghiệp lớn nắm quyền kiểm soát việc sản xuất và bán hàng hóa, có khả năng tự đặt giá để thu lợi nhuận cao.
                </p>
                <div className="mt-4 flex items-center gap-2 text-red-600 font-semibold mb-4">
                  <TrendingUp size={20} />
                  <span>Quyền lực thị trường tối đa</span>
                </div>
                <img src="https://www.brettjfox.com/wp-content/uploads/2019/11/monopoly.jpg" alt="Thị trường độc quyền và cạnh tranh" className="w-full h-48 object-contain rounded-xl bg-gray-50" />
              </div>

              <div className="group bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-blue-500">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-xl group-hover:scale-110 transition-transform">
                    <Building2 className="text-white" size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Độc quyền Nhà nước</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg mb-4">
                  Độc quyền nhà nước là khi nhà nước giữ vị trí độc quyền trong các ngành kinh tế quan trọng nhằm ổn định kinh tế và bảo đảm lợi ích xã hội.
                </p>
                <div className="mt-4 flex items-center gap-2 text-blue-600 font-semibold mb-4">
                  <Shield size={20} />
                  <span>Can thiệp điều tiết nền kinh tế</span>
                </div>
                <img src="https://cdnphoto.dantri.com.vn/rCa1AByaGRIMrNg2QKjpI3_tqTM=/zoom/1200_630/2019/05/04/mdocquyen-1556916683912.jpg" alt="Biểu đồ độc quyền" className="w-full h-48 object-contain rounded-xl bg-gray-50" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl shadow-xl p-8 border-l-8 border-indigo-600">
              <h3 className="text-2xl font-bold text-indigo-900 mb-6 flex items-center gap-3">
                <Zap className="text-yellow-500" size={32} />
                Các khía cạnh nghiên cứu chính
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { icon: Target, text: 'Nguyên nhân hình thành và phát triển của độc quyền', color: 'text-red-600' },
                  { icon: TrendingUp, text: 'Tác động của độc quyền đối với nền kinh tế và xã hội', color: 'text-blue-600' },
                  { icon: Scale, text: 'Quan hệ cạnh tranh trong điều kiện độc quyền', color: 'text-green-600' },
                  { icon: Building2, text: 'Vai trò của nhà nước trong nền kinh tế độc quyền', color: 'text-purple-600' }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
                    <item.icon className={`${item.color} flex-shrink-0 mt-1`} size={24} />
                    <span className="text-gray-800 font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === '4.1' && (
          <div className="space-y-8">
            <div className="relative bg-white bg-opacity-95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full -mr-48 -mt-48 opacity-50"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-4 rounded-2xl shadow-lg">
                    <TrendingUp className="text-white" size={40} />
                  </div>
                  <h2 className="text-4xl font-bold text-blue-600">
                    4.1. Cạnh tranh ở cấp độ độc quyền
                  </h2>
                </div>

                <div className="mb-8 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-2xl p-6 flex items-center gap-6">
                  <img src="https://content.triethocduongpho.net/wp-content/uploads/2014/07/thi-truong-doc-quyen-va-canh-tranh.png" alt="Cạnh tranh trong thị trường" className="w-64 h-48 object-contain rounded-xl bg-white shadow-lg" />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-blue-900 mb-3">Bản chất cạnh tranh độc quyền</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Trong điều kiện độc quyền, cạnh tranh không biến mất mà trở nên gay gắt và phức tạp hơn, diễn ra giữa các tổ chức độc quyền để giành thị phần và tối đa hóa lợi nhuận.
                    </p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200 shadow-lg">
                    <h3 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-3">
                      <Sparkles className="text-yellow-500" size={28} />
                      Nguyên nhân hình thành độc quyền
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      {[
                        { icon: Zap, title: '1. Khoa học - Kỹ thuật', desc: 'Sự phát triển của công nghệ đòi hỏi quy mô sản xuất lớn', color: 'from-yellow-400 to-orange-400' },
                        { icon: Target, title: '2. Cạnh tranh gay gắt', desc: 'Các doanh nghiệp nhỏ bị đào thải, doanh nghiệp lớn sáp nhập', color: 'from-red-400 to-pink-400' },
                        { icon: TrendingDown, title: '3. Khủng hoảng kinh tế', desc: 'Hệ thống tín dụng thúc đẩy tập trung vốn', color: 'from-purple-400 to-indigo-400' }
                      ].map((item, index) => (
                        <div key={index} className="group bg-white rounded-xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                          <div className={`bg-gradient-to-br ${item.color} p-4 rounded-xl mb-4 inline-block group-hover:scale-110 transition-transform`}>
                            <item.icon className="text-white" size={32} />
                          </div>
                          <div className="font-bold text-gray-800 text-lg mb-2">{item.title}</div>
                          <p className="text-gray-600">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200 shadow-lg">
                    <h3 className="text-2xl font-bold text-green-900 mb-6 flex items-center gap-3">
                      <DollarSign className="text-green-600" size={28} />
                      Giá cả và Lợi nhuận độc quyền
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-green-500 hover:shadow-xl transition-shadow">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="bg-gradient-to-br from-green-400 to-emerald-400 p-3 rounded-xl">
                            <TrendingUp className="text-white" size={28} />
                          </div>
                          <span className="font-bold text-green-800 text-xl">Giá độc quyền cao</span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">Khi bán hàng hóa, độc quyền đặt giá cao hơn giá trị để thu lợi nhuận siêu ngạch</p>
                      </div>
                      <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-red-500 hover:shadow-xl transition-shadow">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="bg-gradient-to-br from-red-400 to-orange-400 p-3 rounded-xl">
                            <TrendingDown className="text-white" size={28} />
                          </div>
                          <span className="font-bold text-red-800 text-xl">Giá độc quyền thấp</span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">Khi mua nguyên liệu, độc quyền ép giá thấp để tăng lợi nhuận</p>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4">
                      <img src="https://cafefcdn.com/zoom/600_315/203337114487263232/2023/11/22/ap-luc-canh-tranh-tu-doi-thu-trong-nganh-17006291350451724847987-11-0-461-720-crop-1700629149343221721235.png" alt="Lợi nhuận độc quyền" className="w-full h-64 object-contain" />
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl shadow-xl p-8 border-2 border-yellow-300">
                    <h3 className="text-2xl font-bold text-yellow-900 mb-6 flex items-center gap-3">
                      <Award className="text-yellow-600" size={28} />
                      Tác động của độc quyền
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="bg-gradient-to-br from-green-400 to-emerald-400 p-3 rounded-xl">
                            <CheckCircle className="text-white" size={28} />
                          </div>
                          <span className="font-bold text-green-800 text-xl">Tích cực</span>
                        </div>
                        <ul className="space-y-3 text-gray-700">
                          {['Thúc đẩy nghiên cứu kỹ thuật mới', 'Tăng năng suất và hiện đại hóa', 'Tạo sức mạnh kinh tế lớn'].map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="bg-gradient-to-br from-red-400 to-orange-400 p-3 rounded-xl">
                            <XCircle className="text-white" size={28} />
                          </div>
                          <span className="font-bold text-red-800 text-xl">Tiêu cực</span>
                        </div>
                        <ul className="space-y-3 text-gray-700">
                          {['Giá cao, thiệt hại người tiêu dùng', 'Kìm hãm tiến bộ kỹ thuật', 'Tăng chênh lệch giàu nghèo'].map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <XCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === '4.2' && (
          <div className="space-y-8">
            <div className="relative bg-white bg-opacity-95 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-gradient-to-br from-red-500 to-orange-500 p-4 rounded-2xl shadow-lg">
                  <Users className="text-white" size={40} />
                </div>
                <h2 className="text-4xl font-bold text-red-600">
                  4.2. Lý luận V.I. Lênin
                </h2>
              </div>

              <div className="mb-8 bg-gradient-to-r from-red-100 to-orange-100 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
                <img src="https://cafefcdn.com/203337114487263232/2021/10/30/thu-nhap-thu-dong-mo-rongtai-chinh-1635583762873414521463.jpg" alt="Người kinh doanh nằm trên tiền" className="w-80 object-contain rounded-xl bg-white shadow-lg" />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-red-900 mb-3">Xuất khẩu tư bản và lợi nhuận thụ động</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Tư bản tài chính tìm kiếm lợi nhuận siêu ngạch thông qua xuất khẩu tư bản ra nước ngoài, tạo ra lớp người hưởng lợi mà không cần lao động.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 border-2 border-red-200 shadow-lg mb-8">
                <h3 className="text-3xl font-bold text-red-900 mb-6">
                  Năm đặc điểm kinh tế của độc quyền
                </h3>

                <div className="space-y-5">
                  {[
                    { title: 'Tích tụ và tập trung tư bản lớn', content: 'Sự tập trung sản xuất cao dẫn đến hình thành các tổ chức độc quyền. Các doanh nghiệp lớn liên kết với nhau để thỏa hiệp và chi phối thị trường.', icon: Factory },
                    { title: 'Tư bản tài chính và tài phiệt', content: 'Sự hợp nhất giữa độc quyền ngân hàng và công nghiệp tạo ra tư bản tài chính. Nhóm tài phiệt sử dụng cổ phiếu để chi phối kinh tế và chính trị.', icon: DollarSign },
                    { title: 'Xuất khẩu tư bản phổ biến', content: 'Các tập đoàn đưa vốn ra nước ngoài qua đầu tư trực tiếp và gián tiếp để tìm kiếm lợi nhuận cao hơn.', icon: Globe },
                    { title: 'Phân chia thị trường thế giới', content: 'Xuất khẩu tư bản dẫn đến phân chia thế giới về kinh tế. Các tập đoàn cạnh tranh rồi thỏa hiệp để củng cố địa vị độc quyền.', icon: Target },
                    { title: 'Phân chia lãnh thổ ảnh hưởng', content: 'Các tập đoàn lôi kéo chính phủ phân chia lãnh thổ, thuộc địa và khu vực ảnh hưởng để chiếm đoạt nguồn nguyên liệu.', icon: Building2 }
                  ].map((item, index) => (
                    <div key={index} className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all">
                      <div className="flex items-start gap-4">
                        <div className="bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-bold text-red-800 text-xl mb-2">{item.title}</h4>
                          <p className="text-gray-700">{item.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6 bg-white rounded-xl p-4 shadow-lg">
                <img src="https://image.luatvietnam.vn/uploaded/1200x675twebp/images/original/2023/05/24/nguyen-nhan-hinh-thanh-doc-quyen_2405095915.png" alt="Người đứng trên thế giới" className="w-full h-72 object-contain" />
                <p className="text-center text-gray-600 mt-4 font-medium">Tư bản độc quyền mở rộng ảnh hưởng toàn cầu</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200 shadow-lg">
                <h3 className="text-3xl font-bold text-blue-900 mb-6">
                  Ba đặc trưng độc quyền nhà nước
                </h3>

                <div className="space-y-5">
                  {[
                    { title: 'Kết hợp nhân sự', content: 'Sự thâm nhập chặt chẽ về con người giữa tổ chức độc quyền và bộ máy nhà nước. "Hôm nay là bộ trưởng, ngày mai là chủ ngân hàng".', icon: Users },
                    { title: 'Sở hữu nhà nước', content: 'Hình thành để phục vụ lợi ích tư bản độc quyền. Nhà nước trở thành thị trường tiêu thụ lớn qua đơn đặt hàng.', icon: Building2 },
                    { title: 'Công cụ điều tiết', content: 'Nhà nước dùng ngân sách, thuế, tín dụng để điều tiết nền kinh tế, phục vụ lợi ích tư bản độc quyền.', icon: Scale }
                  ].map((item, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 shadow-md">
                      <div className="flex items-start gap-3">
                        <item.icon className="text-blue-600 flex-shrink-0" size={28} />
                        <div>
                          <h4 className="font-bold text-blue-800 text-lg mb-2">{item.title}</h4>
                          <p className="text-gray-700">{item.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === '4.3.1' && (
          <div className="space-y-8">
            <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gradient-to-br from-green-500 to-teal-500 p-4 rounded-2xl">
                  <Globe className="text-white" size={40} />
                </div>
                <h2 className="text-4xl font-bold text-green-600">4.3.1. Biểu hiện mới của độc quyền</h2>
              </div>

              <div className="space-y-6">
                {/* a. Tích tụ và tập trung tư bản */}
                <section className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6 border border-green-200">
                  <h3 className="text-2xl font-bold text-green-900 mb-3">a. Tích tụ và tập trung tư bản</h3>
                  <ul className="list-none space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <ChevronRight className="text-green-600 shrink-0 mt-1" size={18} />
                      <div>Xuất hiện các công ty xuyên quốc gia (TNCs) nhờ khoa học – công nghệ và lực lượng sản xuất phát triển.</div>
                    </li>
                    <li className="ml-6">
                      <div className="font-semibold">Hình thức độc quyền mới:</div>
                      <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-2">
                        <li><strong>Concern</strong>: Tổ chức đa ngành, hàng trăm xí nghiệp ở nhiều nước, phân tán rủi ro, tránh luật chống độc quyền.</li>
                        <li><strong>Conglomerate</strong>: Liên kết nhiều công ty vừa và nhỏ, chủ yếu để thu lợi nhuận tài chính.</li>
                      </ul>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="text-green-600 shrink-0 mt-1" size={18} />
                      <div>Doanh nghiệp vừa và nhỏ vẫn tồn tại — vừa phụ thuộc vào độc quyền lớn, vừa linh hoạt, đổi mới và mạo hiểm đầu tư.</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="text-green-600 shrink-0 mt-1" size={18} />
                      <div>Xu hướng quốc tế hóa mạnh mẽ, hình thành xu hướng chủ nghĩa tư bản độc quyền nhà nước.</div>
                    </li>
                  </ul>
                </section>

                {/* b. Vai trò của tư bản tài chính */}
                <section className="bg-white rounded-xl p-6 border border-green-100 shadow-sm">
                  <h3 className="text-2xl font-bold text-green-800 mb-3">b. Vai trò của tư bản tài chính</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <ChevronRight className="text-green-600 shrink-0 mt-1" size={18} />
                      <div>Phạm vi hoạt động đa dạng: công nghiệp – thương mại – dịch vụ – tài chính.</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="text-green-600 shrink-0 mt-1" size={18} />
                      <div>Hình thành tổ hợp liên ngành và mạng lưới tài chính toàn cầu.</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="text-green-600 shrink-0 mt-1" size={18} />
                      <div>Kiểm soát doanh nghiệp theo chế độ tham dự và ủy nhiệm, trực tiếp và gián tiếp.</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="text-green-600 shrink-0 mt-1" size={18} />
                      <div>Các trung tâm tài chính thế giới (New York, London, Tokyo…) củng cố quyền lực của tư bản tài chính.</div>
                    </li>
                  </ul>
                </section>

                {/* c. Xuất khẩu tư bản */}
                <section className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="text-2xl font-bold text-blue-900 mb-3">c. Xuất khẩu tư bản</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <ChevronRight className="text-blue-600 shrink-0 mt-1" size={18} />
                      <div>Dòng vốn chuyển giữa các nước, tập trung vào công nghệ cao, tài chính và dịch vụ.</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="text-blue-600 shrink-0 mt-1" size={18} />
                      <div>Chủ thể đa dạng: TNCs và cả một số nước đang phát triển tham gia xuất khẩu tư bản.</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="text-blue-600 shrink-0 mt-1" size={18} />
                      <div>Hình thức: kết hợp FDI, xuất khẩu hàng hóa, chuyển giao công nghệ, BOT/BT và các hợp đồng đầu tư khác.</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="text-blue-600 shrink-0 mt-1" size={18} />
                      <div>Bản chất: từ áp đặt thực dân sang nguyên tắc "cùng có lợi" nhưng vẫn tồn tại lệ thuộc về vốn và công nghệ.</div>
                    </li>
                  </ul>
                </section>

                {/* d. Phân chia thị trường thế giới */}
                <section className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">d. Phân chia thị trường thế giới</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <ChevronRight className="text-gray-600 shrink-0 mt-1" size={18} />
                      <div>TNCs chi phối thị trường toàn cầu → hình thành chủ nghĩa tư bản độc quyền quốc tế.</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="text-gray-600 shrink-0 mt-1" size={18} />
                      <div>Xây dựng khối khu vực: EU, NAFTA, OPEC, MERCOSUR, ASEAN — xu hướng khu vực hóa mạnh.</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="text-gray-600 shrink-0 mt-1" size={18} />
                      <div>Hợp tác và cạnh tranh cùng tồn tại, phản ánh mâu thuẫn lợi ích giữa các trung tâm tư bản.</div>
                    </li>
                  </ul>
                </section>

                {/* e. Phân chia lãnh thổ ảnh hưởng */}
                <section className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
                  <h3 className="text-2xl font-bold text-yellow-900 mb-3">e. Phân chia lãnh thổ ảnh hưởng</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <ChevronRight className="text-yellow-600 shrink-0 mt-1" size={18} />
                      <div>Sau chủ nghĩa thực dân, xuất hiện "biên giới kinh tế mềm" — nước yếu bị chi phối về vốn, công nghệ và thương mại.</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="text-yellow-600 shrink-0 mt-1" size={18} />
                      <div>Thế kỷ XXI: cạnh tranh giữa cường quốc diễn ra qua chiến tranh thương mại, xung đột công nghệ và ảnh hưởng geopolitics, có sự tham gia của TNCs.</div>
                    </li>
                  </ul>
                </section>

                <div className="bg-indigo-50 rounded-xl p-4 mt-4 border-l-4 border-indigo-400">
                  <h4 className="font-bold text-indigo-900">🔹 Tổng kết</h4>
                  <p className="text-gray-700 mt-2">Độc quyền hiện đại mang tính quốc tế hóa, tài chính hóa và nhà nước hóa — tạo nên hình thức mới của chủ nghĩa tư bản: chủ nghĩa tư bản độc quyền nhà nước hiện đại.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === '4.3.2' && (
          <div className="space-y-8">
            <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-4 rounded-2xl">
                  <Building2 className="text-white" size={40} />
                </div>
                <h2 className="text-4xl font-bold text-indigo-600">4.3.2. Độc quyền nhà nước hiện đại</h2>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border-l-4 border-emerald-600">
                  <h3 className="text-xl font-bold text-emerald-900 mb-4">1. Cơ chế quan hệ nhân sự</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="text-emerald-600 flex-shrink-0 mt-1" size={20} />
                      <span>Bộ máy nhà nước thay đổi theo hướng đa nguyên, phân chia quyền lực do sự phát triển của dân trí</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="text-emerald-600 flex-shrink-0 mt-1" size={20} />
                      <span>Các thế lực tư bản độc quyền thỏa hiệp và cùng tồn tại</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="text-emerald-600 flex-shrink-0 mt-1" size={20} />
                      <span>Lực lượng trung dung nắm vai trò cân bằng giữa các phe</span>
                    </li>
                  </ul>
                  <div className="bg-white rounded-lg p-4 mt-4 border-l-4 border-orange-500">
                    <p className="font-semibold text-orange-800">
                      ⚠️ Tuy nhiên, bản chất giai cấp vẫn không đổi - quyền lực phục vụ lợi ích tư bản độc quyền
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border-l-4 border-blue-600">
                  <h3 className="text-xl font-bold text-blue-900 mb-4">2. Biểu hiện mới về sở hữu nhà nước</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                      <span>Chi tiêu và ngân sách được giám sát chặt chẽ, ưu tiên ổn định kinh tế vĩ mô</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                      <span>Nhà nước nắm cổ phần trong nhiều ngân hàng và tập đoàn lớn</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                      <span>Đầu tư mạnh vào khoa học cơ bản, hạ tầng và an sinh xã hội</span>
                    </li>
                  </ul>
                  <div className="bg-amber-50 rounded-lg p-4 mt-3 border border-amber-200">
                    <p className="font-semibold text-amber-900 mb-2">📌 Ví dụ: Khủng hoảng 2008-2009</p>
                    <p className="text-gray-700">Nhà nước cứu trợ Citigroup, AIG - cho thấy mối quan hệ gắn bó với tư bản độc quyền</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl p-6 border-l-4 border-violet-600">
                  <h3 className="text-xl font-bold text-violet-900 mb-4">3. Vai trò điều tiết kinh tế</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="text-violet-600 flex-shrink-0 mt-1" size={20} />
                      <span>Độc quyền nhà nước tập trung ở các lĩnh vực chiến lược: tài chính, năng lượng, quốc phòng</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="text-violet-600 flex-shrink-0 mt-1" size={20} />
                      <span>Hệ thống chính trị vận hành như "công ty cổ phần" chia sẻ quyền lực</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="text-violet-600 flex-shrink-0 mt-1" size={20} />
                      <span>Viện trợ và đầu tư ra nước ngoài trở thành công cụ kinh tế-chính trị</span>
                    </li>
                  </ul>
                  <div className="bg-red-50 rounded-lg p-4 mt-3 border border-red-200">
                    <p className="font-semibold text-red-900">⚠️ Khi bị đe dọa: giải tán quốc hội, thiết quân luật, đảo chính (Chile 1973, Nga 1993)</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-red-100 to-orange-100 rounded-xl p-6 border-2 border-red-300 shadow-lg">
                  <h3 className="text-xl font-bold text-red-900 mb-3 flex items-center gap-2">
                    <AlertCircle size={24} />
                    Kết luận
                  </h3>
                  <p className="text-gray-800 font-medium leading-relaxed">
                    Độc quyền nhà nước trong chủ nghĩa tư bản hiện đại vẫn là công cụ của giai cấp tư sản, dù mang vẻ ngoài dân chủ, phúc lợi. Bản chất không thay đổi: phục vụ lợi ích tư bản độc quyền dưới hình thức mềm dẻo, tinh vi hơn.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'case' && (
          <div className="space-y-8">
            <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-2xl p-6 mb-6">
                <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                  <AlertCircle size={32} />
                  Tình huống: Hàn Quốc ân xá tài phiệt
                </h2>
                <p className="text-lg opacity-90">Phân tích theo Kinh tế chính trị Mác - Lênin</p>
              </div>

              <div className="mb-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6">
                <img src="https://cdnphoto.dantri.com.vn/87aopo_0FowpEPIngmy9VVSYWUg=/zoom/1200_630/2022/08/12/thai-tu-samsung-duoc-de-nghi-an-xadocx-1658975628049-crop-1660275849774.jpeg" alt="Thị trường độc quyền" className="w-full h-80 object-contain rounded-xl bg-white shadow-lg mb-4" />
                <p className="text-center text-gray-700 font-medium">Cơ cấu quyền lực trong nền kinh tế độc quyền</p>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-600 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold text-blue-900 mb-3 flex items-center gap-2">
                  📋 Diễn biến sự kiện
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Tháng 8/2022, Chính phủ Hàn Quốc ân xá cho nhiều doanh nhân lớn, trong đó có <strong>Lee Jae-yong (thái tử Samsung)</strong>, với lý do "họ cần được tự do để góp phần phục hồi và phát triển nền kinh tế quốc gia" sau đại dịch COVID-19 và khủng hoảng kinh tế toàn cầu.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 mb-6 border border-purple-200">
                <h3 className="text-2xl font-bold text-purple-900 mb-6 flex items-center gap-2">
                  <Sparkles size={28} />
                  Phân tích lý thuyết
                </h3>

                <div className="space-y-5">
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h4 className="text-lg font-bold text-purple-800 mb-3 flex items-center gap-2">
                      <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">1</span>
                      Liên minh nhà nước và tư bản độc quyền
                    </h4>
                    <div className="space-y-3 text-gray-700 ml-10">
                      <p className="flex items-start gap-2">
                        <ArrowRight className="text-purple-600 flex-shrink-0 mt-1" size={20} />
                        <span>Đặc trưng của <strong>chủ nghĩa tư bản độc quyền nhà nước</strong> - nhà nước can thiệp sâu vào kinh tế nhưng phục vụ lợi ích tư sản độc quyền</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <ArrowRight className="text-purple-600 flex-shrink-0 mt-1" size={20} />
                        <span>Ân xá cho thấy <strong>chính phủ và tập đoàn gắn bó chặt chẽ</strong> - nhà nước cần họ để tăng trưởng, tập đoàn cần nhà nước bảo hộ</span>
                      </p>
                      <div className="bg-purple-100 rounded-lg p-4 mt-3 border-l-4 border-purple-600">
                        <p className="font-semibold text-purple-900">
                          🎯 Nhà nước không còn là "trọng tài trung lập", mà là "công cụ của tư bản độc quyền"
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h4 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
                      <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">2</span>
                      Lý do kinh tế - xã hội
                    </h4>
                    <div className="space-y-3 text-gray-700 ml-10">
                      <p className="flex items-start gap-2">
                        <ArrowRight className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                        <span>Các <strong>tập đoàn chaebol (Samsung, Hyundai, LG, SK)</strong> đóng góp 50-60% GDP, hàng triệu việc làm</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <ArrowRight className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                        <span>Khi khó khăn, chính phủ <strong>dựa vào sức mạnh tư bản độc quyền</strong> để phục hồi tăng trưởng</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <ArrowRight className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                        <span>Ân xá là cách <strong>"hợp pháp hóa" sự phụ thuộc</strong> nhà nước vào tư bản lớn</span>
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h4 className="text-lg font-bold text-green-800 mb-3 flex items-center gap-2">
                      <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">3</span>
                      Ý nghĩa lý luận
                    </h4>
                    <div className="space-y-3 text-gray-700 ml-10">
                      <p className="flex items-start gap-2">
                        <ArrowRight className="text-green-600 flex-shrink-0 mt-1" size={20} />
                        <span>Theo Mác - Lênin: <strong>biểu hiện mới của độc quyền tư bản chủ nghĩa</strong></span>
                      </p>
                      <div className="ml-6 space-y-2">
                        <p className="flex items-start gap-2">
                          <CheckCircle className="text-gray-400 flex-shrink-0 mt-1" size={18} />
                          <span>Nhà nước <strong>vừa là công cụ điều tiết</strong></span>
                        </p>
                        <p className="flex items-start gap-2">
                          <CheckCircle className="text-gray-400 flex-shrink-0 mt-1" size={18} />
                          <span><strong>Vừa là "người phục vụ" lợi ích tập đoàn tư bản</strong></span>
                        </p>
                      </div>
                      <div className="bg-amber-50 rounded-lg p-4 mt-3 border border-amber-300">
                        <p className="font-semibold text-amber-900 mb-2">⚡ Mâu thuẫn nội tại:</p>
                        <p>Nhà nước phải "vì dân" nhưng hành động "vì tư bản", để duy trì ổn định hệ thống</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-2xl p-6 shadow-xl">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <BookOpen size={28} />
                  Kết luận tổng hợp
                </h3>
                <div className="space-y-3 text-white leading-relaxed">
                  <p>
                    Việc Hàn Quốc ân xá cho các nhà tài phiệt, đặc biệt là lãnh đạo Samsung, là biểu hiện rõ của <strong>sự gắn kết lợi ích giữa nhà nước tư sản và tư bản độc quyền</strong>, hay <strong>chủ nghĩa tư bản độc quyền nhà nước</strong>.
                  </p>
                  <p>
                    Hành động này không xuất phát từ "nhân đạo" mà từ <strong>nhu cầu kinh tế - chính trị của giai cấp tư sản</strong>, nhằm <strong>duy trì sự ổn định và lợi nhuận trong khủng hoảng</strong>.
                  </p>
                  {/* <div className="bg-white bg-opacity-20 rounded-lg p-4 mt-4">
                    <p className="font-bold">
                      👉 Tình huống này thuộc về phần 4.3.2.3 - "Biểu hiện mới trong vai trò công cụ điều tiết kinh tế của độc quyền nhà nước"
                    </p>
                  </div> */}
                </div>
              </div>

              <div className="mt-8 grid md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-5 border border-indigo-200">
                  <div className="text-indigo-600 font-bold mb-2 flex items-center gap-2">
                    <BookOpen size={20} />
                    Khái niệm
                  </div>
                  <div className="text-sm text-gray-700">Chủ nghĩa tư bản độc quyền nhà nước</div>
                </div>
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-5 border border-pink-200">
                  <div className="text-pink-600 font-bold mb-2 flex items-center gap-2">
                    <Target size={20} />
                    Công cụ phân tích
                  </div>
                  <div className="text-sm text-gray-700">Lý thuyết Mác - Lênin về độc quyền</div>
                </div>
                <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-5 border border-teal-200">
                  <div className="text-teal-600 font-bold mb-2 flex items-center gap-2">
                    <Factory size={20} />
                    Ví dụ thực tiễn
                  </div>
                  <div className="text-sm text-gray-700">Samsung, Hyundai, LG, SK</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="relative bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 text-white py-8 mt-12 border-t-4 border-purple-500">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-200 font-semibold text-lg mb-1">Kinh tế Chính trị Mác - Lênin</p>
              <p className="text-gray-400 text-sm">Cạnh tranh và Độc quyền trong Nền kinh tế Thị trường</p>
            </div>
            <div className="flex items-center gap-3 bg-white bg-opacity-10 backdrop-blur-sm rounded-xl px-6 py-3 border border-white border-opacity-20">
              <Bot className="text-purple-400" size={32} />
              <div>
                <p className="text-sm text-gray-300">Được hỗ trợ bởi</p>
                <p className="font-bold text-purple-400">Claude AI</p>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-700 text-center">
            <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
              <Sparkles size={16} className="text-yellow-400" />
              Phát triển với công nghệ React, TypeScript và TailwindCSS
              <Sparkles size={16} className="text-yellow-400" />
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;