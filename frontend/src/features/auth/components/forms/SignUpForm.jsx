import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Select from "@/components/form/Select";
import Alert from "@/components/ui/alert/Alert";
import DatePicker from "@/components/form/date-picker";
import Radio from "@/components/form/input/Radio";

export default function SignInForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [birthDate, setBirthDate] = useState("");
    const [gender, setGender] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <div className="flex flex-col flex-1 w-full overflow-y-auto py-10 lg:w-1/2">
            <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
                <div className="w-full max-w-md pb-10 mx-auto">
                    <Link
                        to="/"
                        className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                        <ChevronLeftIcon className="size-5" />
                        Kembali ke Beranda
                    </Link>
                </div>
                
                <div>
                    <div className="mb-5 sm:mb-8">
                        <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                            Daftar Akun
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Masukkan data diri untuk membuat akun.
                        </p>
                    </div>

                    <form className="space-y-5">
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                                <Label htmlFor="nama_lengkap">
                                    Nama Lengkap<span className="text-error-500">*</span>
                                </Label>
                                <Input
                                    type="text"
                                    id="nama_lengkap"
                                    name="nama_lengkap"
                                    placeholder="Masukkan nama lengkap"
                                    required
                                    minLength={3}
                                    maxLength={100}
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <Label htmlFor="email">
                                    Email PENS<span className="text-error-500">*</span>
                                </Label>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="user@it.student.pens.ac.id"
                                    required
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <Label htmlFor="password">
                                    Kata Sandi<span className="text-error-500">*</span>
                                </Label>
                                <div className="relative">
                                    <Input
                                        placeholder="Minimal 8 karakter, huruf besar, kecil & angka"
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        required
                                        minLength={8}
                                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$"
                                        title="Password minimal 8 karakter, termasuk huruf besar, kecil, dan angka"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute z-30 -translate-y-1/2 right-4 top-1/2"
                                        aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                                    >
                                        {showPassword ? (
                                            <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                                        ) : (
                                            <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="sm:col-span-1">
                                <Label htmlFor="phoneNumber">
                                    No. WhatsApp<span className="text-error-500">*</span>
                                </Label>
                                <Input
                                    type="tel"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    placeholder="628812345678"
                                    required
                                />
                            </div>

                            <div className="sm:col-span-1">
                                <Label htmlFor="nrp">
                                    NRP<span className="text-error-500">*</span>
                                </Label>
                                <Input
                                    type="text"
                                    id="nrp"
                                    name="nrp"
                                    placeholder="Masukkan NRP (10 digit)"
                                    required
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <DatePicker
                                    id="date-picker"
                                    label="Tanggal Lahir"
                                    placeholder="Pilih tanggal lahir"
                                    onChange={(dateStr) => setBirthDate(dateStr)}
                                    required
                                    maxDate={new Date().toISOString().split('T')[0]}
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <Label>Jenis Kelamin<span className="text-error-500">*</span></Label>
                                <div className="flex gap-4 mt-2">
                                    <Radio
                                        name="gender"
                                        value="male"
                                        checked={gender === "male"}
                                        onChange={() => setGender("male")}
                                        label="Laki-laki"
                                        required
                                    />
                                    <Radio
                                        name="gender"
                                        value="female"
                                        checked={gender === "female"}
                                        onChange={() => setGender("female")}
                                        label="Perempuan"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Tombol Submit */}
                        <div>
                            <button
                                type="submit"
                                className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Mengirim..." : "Daftar"}
                            </button>
                        </div>

                        {/* Link Login */}
                        <div className="mt-5">
                            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                                Sudah punya akun?{" "}
                                <Link
                                    to="/signin"
                                    className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                                >
                                    Masuk
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}