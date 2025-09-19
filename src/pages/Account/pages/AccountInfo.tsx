import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { getUiUser } from "../utils";
import { LuCheck, LuCircle } from "react-icons/lu";

export default function AccountInfo() {
  const { t } = useTranslation("account");
  const user = useMemo(() => getUiUser(), []);
  // Estado para validación de contraseña
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

  const rules = {
    min: newPwd.length >= 8,
    upper: /[A-Z]/.test(newPwd),
    number: /\d/.test(newPwd),
    lower: /[a-z]/.test(newPwd),
    space: !/\s/.test(newPwd),
    special: /[^A-Za-z0-9]/.test(newPwd),
  } as const;

  const allRulesOk = Object.values(rules).every(Boolean);
  const passwordsMatch = newPwd.length > 0 && newPwd === confirmPwd;
  const canSubmitPassword =
    currentPwd.length > 0 && allRulesOk && passwordsMatch;

  return (
    <div className="p-6 md:p-8">
      {/* Editar información personal */}
      <section>
        <h2 className="text-lg font-semibold text-neutral-900">
          {t("info.title")}
        </h2>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Nombres y apellidos */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm text-neutral-600 mb-1">
              {t("info.fullName")}
            </label>
            <input
              className="w-full border-0 border-b border-neutral-300 rounded-none px-3 py-2 focus:outline-none focus:ring-0 focus:border-emerald-600 placeholder:text-neutral-400"
              defaultValue={user.fullName}
              placeholder={t("placeholders.fullName")}
            />
          </div>

          {/* Tipo de documentación */}
          <div>
            <label className="block text-sm text-neutral-600 mb-1">
              {t("info.docType")}
            </label>
            <input
              className="w-full border-0 border-b border-neutral-300 rounded-none px-3 py-2 focus:outline-none focus:ring-0 focus:border-emerald-600 placeholder:text-neutral-400"
              defaultValue={user.documentType}
              placeholder={t("placeholders.docType")}
            />
          </div>

          {/* Documento */}
          <div>
            <label className="block text-sm text-neutral-600 mb-1">
              {t("info.docNumber")}
            </label>
            <input
              className="w-full border-0 border-b border-neutral-300 rounded-none px-3 py-2 focus:outline-none focus:ring-0 focus:border-emerald-600 placeholder:text-neutral-400"
              defaultValue={user.documentNumber}
              placeholder={t("placeholders.docNumber")}
            />
          </div>

          {/* Celular */}
          <div>
            <label className="block text-sm text-neutral-600 mb-1">
              {t("info.phone")}
            </label>
            <input
              className="w-full border-0 border-b border-neutral-300 rounded-none px-3 py-2 focus:outline-none focus:ring-0 focus:border-emerald-600 placeholder:text-neutral-400"
              defaultValue={user.phone}
              placeholder="+51 999 999 999"
            />
          </div>

          {/* Correo */}
          <div>
            <label className="block text-sm text-neutral-600 mb-1">
              {t("info.email")}
            </label>
            <input
              className="w-full border-0 border-b border-neutral-300 rounded-none px-3 py-2 focus:outline-none focus:ring-0 focus:border-emerald-600 placeholder:text-neutral-400"
              defaultValue={user.email}
              type="email"
              placeholder="correo@correo.com"
            />
          </div>
        </div>

        <div className="mt-10 text-center">
          <button
            type="button"
            className="btn btn-primary"
            onClick={(e) => e.preventDefault()}
            aria-disabled
          >
            {t("info.save")}
          </button>
        </div>
      </section>

      {/* Cambiar contraseña */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold text-neutral-900">
          {t("password.title")}
        </h2>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm text-neutral-600 mb-1">
              {t("password.current")}
            </label>
            <input
              className="w-full border-0 border-b border-neutral-300 rounded-none px-3 py-2 focus:outline-none focus:ring-0 focus:border-emerald-600 placeholder:text-neutral-400"
              placeholder="••••••••"
              type="password"
              value={currentPwd}
              onChange={(e) => setCurrentPwd(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-600 mb-1">
              {t("password.new")}
            </label>
            <input
              className="w-full border-0 border-b border-neutral-300 rounded-none px-3 py-2 focus:outline-none focus:ring-0 focus:border-emerald-600 placeholder:text-neutral-400"
              placeholder="••••••••"
              type="password"
              value={newPwd}
              onChange={(e) => setNewPwd(e.target.value)}
            />
          </div>

          {/* Confirmar contraseña */}
          <div>
            <label className="block text-sm text-neutral-600 mb-1">
              Confirmar contraseña
            </label>
            <input
              className="w-full border-0 border-b border-neutral-300 rounded-none px-3 py-2 focus:outline-none focus:ring-0 focus:border-emerald-600 placeholder:text-neutral-400"
              placeholder="••••••••"
              type="password"
              value={confirmPwd}
              onChange={(e) => setConfirmPwd(e.target.value)}
            />
            {!passwordsMatch && confirmPwd.length > 0 && (
              <p className="mt-1 text-xs text-red-600">
                Las contraseñas no coinciden
              </p>
            )}
          </div>
        </div>
        <div className="mt-3 text-sm">
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-2 text-xs">
            <li className={rules.min ? "text-primary" : "text-neutral-500"}>
              {rules.min ? (
                <span className="inline-flex items-center gap-2">
                  <LuCheck className="h-4 w-4" /> {t("password.rules.min")}
                </span>
              ) : (
                <span className="inline-flex items-center gap-2">
                  <LuCircle className="h-4 w-4" /> {t("password.rules.min")}
                </span>
              )}
            </li>
            <li className={rules.upper ? "text-primary" : "text-neutral-500"}>
              {rules.upper ? (
                <span className="inline-flex items-center gap-2">
                  <LuCheck className="h-4 w-4" /> {t("password.rules.upper")}
                </span>
              ) : (
                <span className="inline-flex items-center gap-2">
                  <LuCircle className="h-4 w-4" /> {t("password.rules.upper")}
                </span>
              )}
            </li>
            <li className={rules.number ? "text-primary" : "text-neutral-500"}>
              {rules.number ? (
                <span className="inline-flex items-center gap-2">
                  <LuCheck className="h-4 w-4" /> {t("password.rules.number")}
                </span>
              ) : (
                <span className="inline-flex items-center gap-2">
                  <LuCircle className="h-4 w-4" /> {t("password.rules.number")}
                </span>
              )}
            </li>
            <li className={rules.lower ? "text-primary" : "text-neutral-500"}>
              {rules.lower ? (
                <span className="inline-flex items-center gap-2">
                  <LuCheck className="h-4 w-4" /> {t("password.rules.lower")}
                </span>
              ) : (
                <span className="inline-flex items-center gap-2">
                  <LuCircle className="h-4 w-4" /> {t("password.rules.lower")}
                </span>
              )}
            </li>
            <li className={rules.space ? "text-primary" : "text-neutral-500"}>
              {rules.space ? (
                <span className="inline-flex items-center gap-2">
                  <LuCheck className="h-4 w-4" /> {t("password.rules.space")}
                </span>
              ) : (
                <span className="inline-flex items-center gap-2">
                  <LuCircle className="h-4 w-4" /> {t("password.rules.space")}
                </span>
              )}
            </li>
            <li className={rules.special ? "text-primary" : "text-neutral-500"}>
              {rules.special ? (
                <span className="inline-flex items-center gap-2">
                  <LuCheck className="h-4 w-4" /> {t("password.rules.special")}
                </span>
              ) : (
                <span className="inline-flex items-center gap-2">
                  <LuCircle className="h-4 w-4" /> {t("password.rules.special")}
                </span>
              )}
            </li>
          </ul>
        </div>

        <div className="mt-10 text-center">
          <button
            type="button"
            className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={(e) => e.preventDefault()}
            disabled={!canSubmitPassword}
          >
            {t("password.save")}
          </button>
        </div>
      </section>
    </div>
  );
}
