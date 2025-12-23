import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { Button } from "../components/ui/Button";
import { useProfileQuery } from "../api/useApi";

export default function DashboardPage() {
  const { clearAuth } = useAuthStore();
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  const { data: profile } = useProfileQuery();

  function handleLogout() {
    clearAuth();
    navigate("/login");
  }

  return (
    <div className="grid grid-cols-12 mx-auto min-h-screen">
      <div className="col-span-12 flex justify-between flex-col items-center border border-slate-200 bg-[#F8FAFC] p-4 md:col-span-3 md:px-5 md:py-8">
        <div className="flex flex-col gap-3 items-center">
          <img alt="profile-logo" src="/profile-logo.png" />
          <div className="text-center">
            <p className="text-sm font-semibold text-slate-900">
              {profile?.first_name + " " + profile?.last_name || "User"}
            </p>
            <p className="text-xs text-slate-500">
              @{profile?.username || "user name"}
            </p>
          </div>
        </div>

        <Button
          variant="danger"
          className="gap-2 mt-10 w-full"
          type="button"
          onClick={() => setShowLogout(true)}
        >
          <span>Logout</span>
        </Button>
      </div>

      <div className="flex flex-col col-span-12 gap-4 bg-white border border-slate-200 md:col-span-9">
        <div className="flex justify-start p-4 bg-[#F8FAFC] h-[54px] w-full items-center">
          <img alt="logo" width={118} height={30} src="/ariana-logo.svg" />
        </div>

        <div className="flex flex-1 justify-center items-center">
          <img alt="empty-state" src="/empty-state.svg" />
        </div>
      </div>

      {showLogout ? (
        <div
          className="flex fixed inset-0 z-50 justify-center items-center px-4 bg-slate-900/50"
          onClick={() => setShowLogout(false)}
        >
          <div
            className="w-full max-w-xl bg-white rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end p-4">
              <button
                type="button"
                aria-label="Close"
                className="text-4xl transition text-slate-400 hover:text-slate-600"
                onClick={() => setShowLogout(false)}
              >
                ×
              </button>
            </div>
            <div className="flex flex-col gap-4 items-center px-8 pb-8">
              <img alt="logout icon" src="/log-out-icon.svg" />
              <div className="space-y-2 text-center">
                <h2 className="text-xl font-semibold text-slate-900">
                  Log out
                </h2>
                <p className="text-sm text-slate-600">
                  Are you sure you want to sign out of your account?
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2 w-full">
                <Button type="button" variant="outline" onClick={handleLogout}>
                  Log out
                </Button>
                <Button type="button" onClick={() => setShowLogout(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
