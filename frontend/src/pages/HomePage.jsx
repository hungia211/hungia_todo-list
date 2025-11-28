import AddTask from "@/components/AddTask";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StatsAndFilter from "@/components/StatsAndFilter";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "@/lib/axios";
import { visibleTaskLimit } from "@/lib/data";

const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeTaskCount, setActiveTaskCount] = useState(0);
  const [completeTaskCount, setCompleteTaskCount] = useState(0);
  const [filter, setFilter] = useState("all");
  const [dateQuery, setDateQuery] = useState("today");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateQuery]);

  useEffect(() => {
    setPage(1);
  }, [filter, dateQuery]);

  // Hàm để lấy dữ liệu nhiệm vụ từ API
  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks?filter=${dateQuery}`);
      setTaskBuffer(res.data.tasks);
      setActiveTaskCount(res.data.activeCount);
      setCompleteTaskCount(res.data.completeCount);
    } catch (error) {
      console.error("Lỗi xảy ra khi truy xuất dữ liệu:", error);
      toast.error("Không thể tải dữ liệu nhiệm vụ.");
    }
  };

  // Hàm callback khi có thay đổi nhiệm vụ
  const handleTaskChanged = () => {
    fetchTasks();
  };

  // Hàm xử lý chuyển sang trang sau
  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  // Hàm xử lý chuyển sang trang trước
  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  // Hàm xử lý chuyển đến trang cụ thể
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // biến lưu theo filter
  const filteredTasks = taskBuffer.filter((task) => {
    switch (filter) {
      case "active":
        return task.status === "active";
      case "completed":
        return task.status === "complete";
      default:
        return true;
    }
  });

  // phân trang
  const visibleTasks = filteredTasks.slice(
    (page - 1) * visibleTaskLimit,
    page * visibleTaskLimit
  );

  // Nếu không có nhiệm vụ hiển thị và không phải trang đầu tiên, quay về trang trước
  if (visibleTasks.length === 0) {
    handlePrev();
  }

  // Tính tổng số trang
  const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit);

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] relative">
      {/* Soft Morning Mist Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
                        linear-gradient(135deg, 
                        rgba(248,250,252,1) 0%, 
                        rgba(219,234,254,0.7) 30%, 
                        rgba(165,180,252,0.5) 60%, 
                        rgba(129,140,248,0.6) 100%
                        ),
                        radial-gradient(circle at 20% 30%, rgba(255,255,255,0.6) 0%, transparent 40%),
                        radial-gradient(circle at 80% 70%, rgba(199,210,254,0.4) 0%, transparent 50%),
                        radial-gradient(circle at 40% 80%, rgba(224,231,255,0.3) 0%, transparent 60%)
                    `,
        }}
      />
      {/* Your Content/Components */}
      <div className="container pt-5 mx-auto relative z-10">
        <div className="w-full max-w-2xl p-5 mx-auto space-y-4">
          {/* Đầu trang */}
          <Header />

          {/* Tạo nhiệm vụ */}
          <AddTask handleNewTaskAdded={handleTaskChanged} />

          {/* Thông kê và bộ lọc */}
          <StatsAndFilter
            filter={filter}
            setFilter={setFilter}
            activeTasksCount={activeTaskCount}
            completedTasksCount={completeTaskCount}
          />

          {/* Danh sách nhiệm vụ */}
          <TaskList
            filteredTasks={visibleTasks}
            filter={filter}
            handleTaskChanged={handleTaskChanged}
          />

          {/* Phân trang và Lọc theo ngày */}
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <TaskListPagination
              handleNext={handleNext}
              handlePrev={handlePrev}
              handlePageChange={handlePageChange}
              page={page}
              totalPages={totalPages}
            />
            <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery} />
          </div>

          {/* Chân trang (footer) */}
          <Footer
            activeTasksCount={activeTaskCount}
            completedTasksCount={completeTaskCount}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
