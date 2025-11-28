import React from "react";

const Footer = ({ completedTasksCount = 0, activeTasksCount = 0 }) => {
  return (
    <>
      {completedTasksCount + activeTasksCount > 0 && (
        <footer className="text-center footer">
          <p className="text-sm text-muted-foreground ">
            {completedTasksCount > 0 && (
              <>
                🎉 Tuyệt vời! Bạn đã hoàn thành {completedTasksCount} việc.
                {activeTasksCount > 0 && (
                  <>🔥Còn {activeTasksCount} việc nữa thôi. Cố lên!</>
                )}
              </>
            )}

            {completedTasksCount === 0 && activeTasksCount > 0 && (
              <>🚀 Hãy bắt đầu với {activeTasksCount} việc cần hoàn thành!</>
            )}
          </p>
        </footer>
      )}
    </>
  );
};

export default Footer;
