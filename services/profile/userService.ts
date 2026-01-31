import api from "../../services/api";

export const getProfile = async () => {
  const res = await api.get("/profile");
  return res.data.data ?? res.data;
};

export const updateProfile = async (data: {
  fullName?: string;
  bio?: string;
  avatar?: { uri: string; type: string; name: string };
}) => {
  const formData = new FormData();

  if (data.fullName) formData.append("fullName", data.fullName);
  if (data.bio) formData.append("bio", data.bio);
  if (data.avatar) {
    formData.append("avatar", {
      uri: data.avatar.uri,
      type: data.avatar.type,
      name: data.avatar.name,
    } as any);
  }

  const res = await api.put("/profile", formData);
  return res.data.data ?? res.data;
};

