import { useId, useState, useEffect } from "react";
import { useSession } from "@/auth/authClient";
import { useCharacterLimit } from "@/hooks/use-character-limit";
import { useImageUpload } from "@/hooks/use-image-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check, ImagePlus, Trash } from "lucide-react";
import { useUpdateUser } from "@/features/user/useUser";
import { useUsernameValidation } from "@/hooks/useUsernameValidation";
import { UserSchema } from "@/schemas/userData.schema";

function Settings() {
  const id = useId();
  const userData = useSession().data?.user;
  const updateUser = useUpdateUser();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    image: "",
    coverImage: "",
    website: "",
    bio: "",
  });
  const [fullName, setFullName] = useState({
    firstName: "",
    lastName: "",
  });
  const [name, setName] = useState(
    `${fullName.firstName} ${fullName.lastName}`,
  );

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState("");

  const { usernameError, isValid } = useUsernameValidation(formData.username);

  useEffect(() => {
    if (userData) {
      const fullName = userData?.name?.split(" ") ?? [];
      const firstName = fullName[0];
      const lastName = (fullName.length > 1 && fullName.at(-1)) || "";
      const website = userData.website?.substring(8);
      setFormData({
        username: userData.username || "",
        email: userData.email || "",
        image: userData.image || "",
        coverImage: userData.coverImage || "",
        website: website || "",
        bio: userData.bio || "",
      });
      setFullName({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      });
    }
  }, [userData]);

  useEffect(() => {
    if (fullName) {
      setName(`${fullName.firstName} ${fullName.lastName}`);
    }
  }, [fullName]);

  const maxLength = 180;
  const {
    value,
    characterCount,
    handleChange,
    maxLength: limit,
  } = useCharacterLimit({
    maxLength,
    initialValue: userData?.bio || "",
  });

  const handleNameOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFullName((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOnReset = () => {
    if (userData) {
      const fullName = userData?.name?.split(" ") ?? [];
      const firstName = fullName[0];
      const lastName = (fullName.length > 1 && fullName.at(-1)) || "";
      const website = userData.website?.substring(8);
      setFormData({
        username: userData.username || "",
        email: userData.email || "",
        image: userData.image || "",
        coverImage: userData.coverImage || "",
        website: website || "",
        bio: userData.bio || "",
      });
      setFullName({
        firstName,
        lastName,
      });
      handleChange({
        target: { value: userData.bio || "" },
      } as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = userData?.id;

    if (!id) return;

    const data = {
      ...formData,
      website: `https://${formData.website}`,
      id,
      name,
    };

    const result = UserSchema.safeParse(data);
    if (!result.success) {
      const fErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) fErrors[err.path[0] as string] = err.message;
      });
      setFieldErrors(fErrors);
      return;
    }

    try {
      await updateUser.mutateAsync(data);
    } catch (err: any) {
      if (err.status === 400) {
        setFieldErrors(err.fieldErrors);
      } else if (err.status === 409) {
        setFieldErrors((prev) => ({ ...prev, username: err.message }));
      } else {
        setGeneralError(err.message);
      }
    }
  };

  return (
    <>
      <div
        className="relative min-h-screen bg-[#fafaf9]"
        style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
      >
        {/* Sophisticated ambient background */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div
            className="absolute -right-64 -top-64 h-[800px] w-[800px] rounded-full bg-linear-to-br from-amber-100/40 via-rose-100/30 to-transparent opacity-60 blur-3xl animate-float"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="absolute -bottom-64 -left-64 h-[700px] w-[700px] rounded-full bg-linear-to-tr from-indigo-100/40 via-purple-100/30 to-transparent opacity-50 blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute right-1/4 top-1/3 h-[500px] w-[500px] rounded-full bg-linear-to-bl from-emerald-100/30 via-teal-100/20 to-transparent opacity-40 blur-3xl animate-float"
            style={{ animationDelay: "4s" }}
          />
        </div>

        {/* Content Container */}
        <div className="relative mx-auto max-w-7xl px-6 py-16 sm:px-8">
          {/* Header */}
          <header
            className="mb-12 animate-fadeInUp"
            style={{ animationDelay: "0.1s", animationFillMode: "both" }}
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 rounded-full border border-stone-200/80 bg-white/60 px-4 py-2 shadow-sm">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-linear-to-r from-amber-500 to-rose-500" />
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-stone-600">
                  Profile
                </span>
              </div>

              <h1
                className="text-shadow-sm text-6xl font-light tracking-tight text-stone-900 sm:text-7xl"
                style={{ fontFamily: "'Crimson Pro', serif" }}
              >
                Settings
              </h1>

              <p className="max-w-2xl text-lg leading-relaxed text-stone-600">
                Manage your profile information and preferences
              </p>
            </div>
          </header>

          {/* Main Card */}
          <div
            className="animate-fadeInUp overflow-hidden rounded-2xl border border-stone-200/80 bg-white/90 shadow-xl backdrop-blur-sm"
            style={{ animationDelay: "0.2s", animationFillMode: "both" }}
          >
            <ProfileBg defaultImage={formData?.coverImage || ""} />
            <Avatar defaultImage={formData?.image || ""} />

            <div className="px-8 pb-10 pt-6">
              <form
                className="space-y-8"
                onSubmit={handleSubmit}
                onReset={handleOnReset}
              >
                {/* Name Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-stone-200/60 pb-3">
                    <div className="h-1 w-8 rounded-full bg-linear-to-r from-amber-500 to-rose-500" />
                    <h2
                      className="text-2xl font-light tracking-tight text-stone-900"
                      style={{ fontFamily: "'Crimson Pro', serif" }}
                    >
                      Personal Information
                    </h2>
                  </div>

                  <div className="grid gap-6 sm:gap-x-6 sm:gap-y-1 sm:grid-cols-2">
                    {/* First Name */}
                    <div className="space-y-2">
                      <Label
                        htmlFor={`${id}-first-name`}
                        className="text-sm font-medium text-stone-700"
                      >
                        First name
                      </Label>
                      <Input
                        id={`${id}-first-name`}
                        value={fullName.firstName}
                        type="text"
                        name="firstName"
                        onChange={handleNameOnChange}
                        required
                        className="border-stone-200 bg-white/80 transition-all duration-300 focus:border-stone-400 focus:bg-white"
                      />
                    </div>

                    {/* Last Name */}
                    <div className="space-y-2">
                      <Label
                        htmlFor={`${id}-last-name`}
                        className="text-sm font-medium text-stone-700"
                      >
                        Last name
                      </Label>
                      <Input
                        id={`${id}-last-name`}
                        value={fullName.lastName}
                        name="lastName"
                        onChange={handleNameOnChange}
                        type="text"
                        required
                        className="border-stone-200 bg-white/80 transition-all duration-300 focus:border-stone-400 focus:bg-white"
                      />
                    </div>
                    <span className="text-sm text-danger">
                      {fieldErrors?.name && `${fieldErrors.name}`}
                    </span>
                  </div>
                </div>

                {/* Account Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-stone-200/60 pb-3">
                    <div className="h-1 w-8 rounded-full bg-linear-to-r from-indigo-500 to-purple-500" />
                    <h2
                      className="text-2xl font-light tracking-tight text-stone-900"
                      style={{ fontFamily: "'Crimson Pro', serif" }}
                    >
                      Account Details
                    </h2>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    {/* Username */}
                    <div className="space-y-2">
                      <Label
                        htmlFor={`${id}-username`}
                        className="text-sm font-medium text-stone-700"
                      >
                        Username
                      </Label>
                      <div className="relative">
                        <Input
                          id={`${id}-username`}
                          className="peer border-stone-200 bg-white/80 pe-9 transition-all duration-300 focus:border-stone-400 focus:bg-white"
                          placeholder="Username"
                          value={formData?.username}
                          type="text"
                          name="username"
                          onChange={handleOnChange}
                          required
                          error={usernameError}
                        />
                        {fieldErrors.username && (
                          <p className="mt-1.5 text-sm text-red-600">
                            {fieldErrors.username}
                          </p>
                        )}
                        {isValid && (
                          <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
                            <Check
                              size={16}
                              strokeWidth={2}
                              className="text-emerald-600"
                              aria-hidden="true"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label
                        htmlFor={`${id}-email`}
                        className="text-sm font-medium text-stone-700"
                      >
                        Email
                      </Label>
                      <div className="relative">
                        <Input
                          id={`${id}-email`}
                          className="peer border-stone-200 bg-white/80 pe-9 transition-all duration-300 focus:border-stone-400 focus:bg-white"
                          placeholder="you@example.com"
                          value={formData?.email}
                          name="email"
                          onChange={handleOnChange}
                          type="email"
                          required
                          error={fieldErrors.email}
                        />
                        <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
                          <Check
                            size={16}
                            strokeWidth={2}
                            className="text-emerald-600"
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Website */}
                  <div className="space-y-2">
                    <Label
                      htmlFor={`${id}-website`}
                      className="text-sm font-medium text-stone-700"
                    >
                      Website
                    </Label>
                    <div className="flex rounded-xl shadow-sm">
                      <span className="inline-flex items-center rounded-s-xl border border-stone-200 bg-stone-50 px-4 text-sm font-medium text-stone-600">
                        https://
                      </span>
                      <Input
                        id={`${id}-website`}
                        className="-ms-px rounded-s-none border-stone-200 bg-white/80 shadow-none transition-all duration-300 focus:border-stone-400 focus:bg-white"
                        placeholder="yourwebsite.com"
                        value={formData?.website || ""}
                        name="website"
                        onChange={handleOnChange}
                        type="text"
                        error={fieldErrors.website}
                      />
                    </div>
                  </div>
                </div>

                {/* Bio Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-stone-200/60 pb-3">
                    <div className="h-1 w-8 rounded-full bg-linear-to-r from-emerald-500 to-teal-500" />
                    <h2
                      className="text-2xl font-light tracking-tight text-stone-900"
                      style={{ fontFamily: "'Crimson Pro', serif" }}
                    >
                      About You
                    </h2>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor={`${id}-bio`}
                      className="text-sm font-medium text-stone-700"
                    >
                      Bio
                    </Label>
                    <Textarea
                      id={`${id}-bio`}
                      placeholder="Write a few sentences about yourself"
                      value={value}
                      maxLength={maxLength}
                      onChange={(e) => {
                        handleOnChange(e);
                        handleChange(e);
                      }}
                      name="bio"
                      aria-describedby={`${id}-description`}
                      error={fieldErrors.bio}
                      className="min-h-32 border-stone-200 bg-white/80 transition-all duration-300 focus:border-stone-400 focus:bg-white"
                    />
                    <p
                      id={`${id}-description`}
                      className="text-right text-xs text-stone-500"
                      role="status"
                      aria-live="polite"
                    >
                      <span className="tabular-nums font-medium">
                        {limit - characterCount}
                      </span>{" "}
                      characters remaining
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-4 border-t border-stone-200/60 pt-8 sm:flex-row sm:justify-end">
                  <Button
                    type="reset"
                    variant="outline"
                    className="cursor-pointer border-stone-200 bg-white/80 font-medium text-stone-700 shadow-sm transition-all duration-300 hover:border-stone-300 hover:bg-stone-50 active:scale-95"
                  >
                    Discard Changes
                  </Button>
                  <Button
                    type="submit"
                    className="cursor-pointer border-0 bg-linear-to-br from-stone-900 via-stone-800 to-stone-900 font-medium text-white shadow-lg shadow-stone-900/25 transition-all duration-500 hover:shadow-xl hover:shadow-stone-900/40 hover:scale-105 active:scale-100"
                  >
                    Save Changes
                  </Button>
                </div>

                {generalError && (
                  <div className="rounded-xl border-2 border-red-100 bg-red-50/80 p-4">
                    <p className="text-sm font-medium text-red-900">
                      {generalError}
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ProfileBg({ defaultImage }: { defaultImage?: string }) {
  const [hideDefault, setHideDefault] = useState(false);
  const {
    previewUrl,
    fileInputRef,
    handleThumbnailClick,
    handleFileChange,
    handleRemove,
  } = useImageUpload();

  const currentImage = previewUrl || (!hideDefault ? defaultImage : null);

  const handleImageRemove = () => {
    handleRemove();
    setHideDefault(true);
  };

  return (
    <div className="h-48">
      <div className="group relative flex h-full w-full items-center justify-center overflow-hidden bg-linear-to-br from-stone-100 to-stone-200">
        {currentImage && (
          <img
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            src={currentImage}
            alt={
              previewUrl
                ? "Preview of uploaded image"
                : "Default profile background"
            }
            width={512}
            height={192}
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/0 transition-all duration-500 group-hover:bg-black/40">
          <button
            type="button"
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 border-white/80 bg-white/20 text-white shadow-lg backdrop-blur-md outline-offset-2 transition-all duration-300 hover:scale-110 hover:bg-white/30 focus-visible:outline focus-visible:outline-ring/70"
            onClick={handleThumbnailClick}
            aria-label={currentImage ? "Change image" : "Upload image"}
          >
            <ImagePlus size={18} strokeWidth={2} aria-hidden="true" />
          </button>
          {currentImage && (
            <button
              type="button"
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 border-white/80 bg-white/20 text-white shadow-lg backdrop-blur-md outline-offset-2 transition-all duration-300 hover:scale-110 hover:bg-red-500/80 hover:border-red-400 focus-visible:outline focus-visible:outline-ring/70"
              onClick={handleImageRemove}
              aria-label="Remove image"
            >
              <Trash size={18} strokeWidth={2} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
        aria-label="Upload image file"
      />
    </div>
  );
}

function Avatar({ defaultImage }: { defaultImage?: string }) {
  const [hideDefault, setHideDefault] = useState(false);
  const {
    previewUrl,
    fileInputRef,
    handleThumbnailClick,
    handleFileChange,
    handleRemove,
  } = useImageUpload();

  const handleImageRemove = () => {
    handleRemove();
    setHideDefault(true);
  };
  const currentImage = previewUrl || (!hideDefault ? defaultImage : null);

  return (
    <div className="-mt-16 px-8">
      <div className="flex items-end gap-4">
        <div className="group relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-linear-to-br from-stone-100 to-stone-200 shadow-2xl shadow-stone-900/20 transition-all duration-500 hover:shadow-3xl hover:shadow-stone-900/30">
          {currentImage && (
            <img
              src={currentImage}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              width={128}
              height={128}
              alt="Profile image"
            />
          )}
          <button
            type="button"
            className="absolute flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-white/80 bg-white/20 text-white shadow-lg backdrop-blur-md outline-offset-2 transition-all duration-300 hover:scale-110 hover:bg-white/30 focus-visible:outline focus-visible:outline-ring/70"
            onClick={handleThumbnailClick}
            aria-label="Change profile picture"
          >
            <ImagePlus size={16} strokeWidth={2} aria-hidden="true" />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
            aria-label="Upload profile picture"
          />
        </div>

        {currentImage && (
          <Button
            type="button"
            className="mb-2 cursor-pointer border-red-200 text-red-600 transition-all duration-300 hover:border-red-300 hover:bg-red-50 hover:text-red-700"
            variant="outline"
            size="sm"
            onClick={handleImageRemove}
            aria-label="Remove image"
          >
            <Trash size={16} strokeWidth={2} aria-hidden="true" />
            Remove Picture
          </Button>
        )}
      </div>
    </div>
  );
}

export { Settings };
