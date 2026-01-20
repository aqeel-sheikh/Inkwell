import { useSession } from "@/auth/authClient";
import { useCharacterLimit } from "@/hooks/use-character-limit";
import { useImageUpload } from "@/hooks/use-image-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check, ImagePlus, Trash } from "lucide-react";
import { useId, useState } from "react";

function Settings() {
  const id = useId();
  const userData = useSession().data?.user;

  const fullName = userData?.name?.split(" ") ?? [];
  const firstName = fullName[0];
  const lastName = fullName.length > 1 ? fullName.at(-1) : "";

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

  return (
    <div className="flex flex-col p-0 sm:max-w-zlg">
      <div>
        <ProfileBg defaultImage={userData?.coverImage || ""} />
        <Avatar defaultImage={userData?.image || ""} />
        <div className="px-6 pb-6 pt-4">
          <form className="space-y-4">
            {/* Name */}
            <div className="flex flex-col gap-4 sm:flex-row">
              {/* First Name */}
              <div className="space-y-2 flex-1">
                <Label htmlFor={`${id}-first-name`}>First name</Label>
                <Input
                  id={`${id}-first-name`}
                  defaultValue={firstName}
                  type="text"
                  required
                />
              </div>
              {/* Last Name */}
              <div className="space-y-2 flex-1">
                <Label htmlFor={`${id}-last-name`}>Last name</Label>
                <Input
                  id={`${id}-last-name`}
                  defaultValue={lastName}
                  type="text"
                  required
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
                    defaultValue={userData?.username}
                    type="text"
                    required
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
                    defaultValue={userData?.email}
                    type="email"
                    required
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
                  defaultValue={userData?.website || ""}
                  type="text"
                />
              </div>
            </div>
            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor={`${id}-bio`}>Bio</Label>
              <Textarea
                id={`${id}-bio`}
                placeholder="Write a few sentences about yourself"
                defaultValue={value}
                maxLength={maxLength}
                onChange={handleChange}
                aria-describedby={`${id}-description`}
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
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer"
              >
                Discard
              </Button>
              <Button type="submit" className="cursor-pointer">
                Save changes
              </Button>
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
