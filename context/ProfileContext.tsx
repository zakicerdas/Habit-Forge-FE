import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "../services/api";
import { useAuth } from "../hooks/useAuth";

type AvatarFile = {
  uri: string;
  type: string;
  name: string;
};

type Profile = {
  id: string;
  fullName: string;
  bio: string | null;
  avatar: string | null;
  userId: string;
};

type EditProfilePayload = {
  fullName?: string;
  bio?: string;
  avatar?: AvatarFile;
};

type ProfileContextType = {
  profile: Profile | null;
  loading: boolean;
  fetchProfile: () => Promise<void>;
  editProfile: (data: EditProfilePayload) => Promise<void>;
};

const ProfileContext = createContext<ProfileContextType | null>(null);

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    if (!user?.id) {
      console.log("⏳ User belum login, skip fetch profile");
      return;
    }

    try {
      setLoading(true);

      // ✅ backend hanya punya GET /api/profile
      const res = await api.get("/profile");
      setProfile(res.data.data);

    } catch (err: any) {
      console.warn("❌ Fetch profile error:", err);
    } finally {
      setLoading(false);
    }
  };

  const editProfile = async (data: EditProfilePayload) => {
  if (!user?.id) return;

  // Kalau ada avatar → pakai FormData
  if (data.avatar) {
    const formData = new FormData();
    if (data.fullName) formData.append("fullName", data.fullName);
    if (data.bio) formData.append("bio", data.bio);
    formData.append("avatar", {
      uri: data.avatar.uri,
      type: data.avatar.type,
      name: data.avatar.name,
    } as any);

    await api.put("/profile", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } else {
    // Kalau tidak ada avatar → cukup JSON
    await api.put("/profile", {
      fullName: data.fullName,
      bio: data.bio,
    });
  }

  await fetchProfile();
};

  useEffect(() => {
    fetchProfile();
  }, [user?.id]);

  return (
    <ProfileContext.Provider
      value={{ profile, loading, fetchProfile, editProfile }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const ctx = useContext(ProfileContext);
  if (!ctx) {
    throw new Error("useProfile must be used within ProfileProvider");
  }
  return ctx;
};
