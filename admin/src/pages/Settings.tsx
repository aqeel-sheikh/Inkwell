import { useId, useState, useEffect } from "react";
import { useSession } from "@/auth/authClient";
import { useCharacterLimit } from "@/hooks/use-character-limit";
import { useImageUpload } from "@/hooks/use-image-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/Input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/Textarea";
import { Check, ImagePlus, Trash } from "lucide-react";
import { useUpdateUser } from "@/features/user/useUser";

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

  useEffect(() => {
    if (userData) {
      const fullName = userData?.name?.split(" ") ?? [];
      const firstName = fullName[0];
      const lastName = (fullName.length > 1 && fullName.at(-1)) || "";
      setFormData({
        username: userData.username || "",
        email: userData.email || "",
        image: userData.image || "",
        coverImage: userData.coverImage || "",
        website: userData.website || "",
        bio: userData.bio || "",
      });
      setFullName({
        firstName,
        lastName,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = userData?.id;

    if (!id) return;

    try {
      await updateUser.mutateAsync({ id, name, ...formData });
    } catch (err: any) {
      if (err.status === 400 && fieldErrors) {
        setFieldErrors(err.fieldErrors);
      } else if (err.status === 409) {
        setFieldErrors((prev) => ({ ...prev, username: err.message }));
      } else {
        setGeneralError(err.message);
      }
    }
  };

  return (
    <div className="flex flex-col p-0 sm:max-w-zlg">
      <div>
        <ProfileBg defaultImage={formData?.coverImage || ""} />
        <Avatar defaultImage={formData?.image || ""} />
        <div className="px-6 pb-6 pt-4">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="flex flex-col gap-4 sm:flex-row">
              {/* First Name */}
              <div className="space-y-2 flex-1">
                <Label htmlFor={`${id}-first-name`}>First name</Label>
                <Input
                  id={`${id}-first-name`}
                  value={fullName.firstName}
                  type="text"
                  name="firstName"
                  onChange={handleNameOnChange}
                  required
                  error={fieldErrors.name}
                />
              </div>
              {/* Last Name */}
              <div className="space-y-2 flex-1">
                <Label htmlFor={`${id}-last-name`}>Last name</Label>
                <Input
                  id={`${id}-last-name`}
                  value={fullName.lastName}
                  name="lastName"
                  onChange={handleNameOnChange}
                  type="text"
                  required
                  error={fieldErrors.name}
                />
              </div>
            </div>
            {/* Username & Email */}
            <div className="flex flex-col gap-4 sm:flex-row">
              {/* Username */}
              <div className="space-y-2 flex-1">
                <Label htmlFor={`${id}-username`}>Username</Label>
                <div className="relative">
                  <Input
                    id={`${id}-username`}
                    className="peer pe-9"
                    placeholder="Username"
                    value={formData?.username}
                    type="text"
                    name="username"
                    onChange={handleOnChange}
                    required
                    error={fieldErrors.username}
                  />
                  <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
                    <Check
                      size={16}
                      strokeWidth={2}
                      className="text-emerald-500"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
              {/* Email */}
              <div className="space-y-2 flex-1">
                <Label htmlFor={`${id}-username`}>Email</Label>
                <div className="relative">
                  <Input
                    id={`${id}-email`}
                    className="peer pe-9"
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
                      className="text-emerald-500"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Website */}
            <div className="space-y-2">
              <Label htmlFor={`${id}-website`}>Website</Label>
              <div className="flex rounded-lg shadow-sm shadow-black/5">
                <span className="inline-flex items-center rounded-s-lg border border-input bg-background px-3 text-sm text-muted-foreground">
                  https://
                </span>
                <Input
                  id={`${id}-website`}
                  className="-ms-px rounded-s-none shadow-none"
                  placeholder="yourwebsite.com"
                  value={formData?.website || ""}
                  name="website"
                  onChange={handleOnChange}
                  type="text"
                  error={fieldErrors.website}
                />
              </div>
            </div>
            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor={`${id}-bio`}>Bio</Label>
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
              />
              <p
                id={`${id}-description`}
                className="mt-2 text-right text-xs text-muted-foreground"
                role="status"
                aria-live="polite"
              >
                <span className="tabular-nums">{limit - characterCount}</span>{" "}
                characters left
              </p>
            </div>
            {/* Buttons */}
            <div className="flex justify-en gap-4">
              <Button type="reset" variant="outline" className="cursor-pointer">
                Discard
              </Button>
              <Button type="submit" className="cursor-pointer">
                Save changes
              </Button>
              {generalError && (
                <div className=" p-4 bg-danger-light/10 border border-danger-light rounded-lg">
                  <p className="text-sm text-danger-dark">{generalError}</p>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
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
    <div className="h-32">
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-muted">
        {currentImage && (
          <img
            className="h-full w-full object-cover"
            src={currentImage}
            alt={
              previewUrl
                ? "Preview of uploaded image"
                : "Default profile background"
            }
            width={512}
            height={96}
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center gap-2">
          <button
            type="button"
            className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-offset-2 transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-ring/70"
            onClick={handleThumbnailClick}
            aria-label={currentImage ? "Change image" : "Upload image"}
          >
            <ImagePlus size={16} strokeWidth={2} aria-hidden="true" />
          </button>
          {currentImage && (
            <button
              type="button"
              className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-offset-2 transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-ring/70"
              onClick={handleImageRemove}
              aria-label="Remove image"
            >
              <Trash size={16} strokeWidth={2} aria-hidden="true" />
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
    <div className="-mt-10 px-6">
      <div className="relative flex size-20 items-center justify-center overflow-hidden rounded-full border-4 border-background bg-muted shadow-sm shadow-black/10">
        {currentImage && (
          <img
            src={currentImage}
            className="h-full w-full object-cover"
            width={80}
            height={80}
            alt="Profile image"
          />
        )}
        <button
          type="button"
          className="absolute flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-offset-2 transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-ring/70"
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
          className="cursor-pointer text-red-400 hover:text-red-500 mt-2"
          variant="outline"
          size="sm"
          onClick={handleImageRemove}
          aria-label="Remove image"
        >
          <Trash size={16} strokeWidth={2} aria-hidden="true" />
          Remove Profile Picture
        </Button>
      )}
    </div>
  );
}

export { Settings };
