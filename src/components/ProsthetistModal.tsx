import { useForm } from "react-hook-form";
import { useTexts } from "../hooks/useTexts";
import { Prosthetist, ProsthetistType, ProsthetistSubtype } from "../types/database";
import { CreateProsthetistInput } from "../hooks/useProsthetists";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

interface ProsthetistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateProsthetistInput) => Promise<void>;
  prosthetist?: Prosthetist;
}

export const ProsthetistModal = ({ isOpen, onClose, onSubmit, prosthetist }: ProsthetistModalProps) => {
  const { texts } = useTexts();
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<CreateProsthetistInput>();
  const selectedType = watch('type');

  useEffect(() => {
    if (prosthetist) {
      reset({
        name: prosthetist.name,
        type: prosthetist.type,
        subtype: prosthetist.subtype,
        cnpj: prosthetist.cnpj || "",
        cpf: prosthetist.cpf || "",
      });
    } else {
      reset({
        name: "",
        type: 'External' as ProsthetistType,
        subtype: 'Laboratory' as ProsthetistSubtype,
        cnpj: "",
        cpf: "",
      });
    }
  }, [prosthetist, reset]);

  const handleFormSubmit = async (data: CreateProsthetistInput) => {
    try {
      await onSubmit(data);
      reset();
      onClose();
    } catch {
      toast.error(texts.dashboard.prosthetists.notifications.createError);
    }
  };

  return (
    <dialog className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box max-w-2xl">
        <h3 className="font-bold text-lg mb-6">
          {prosthetist ? texts.dashboard.prosthetists.modal.edit : texts.dashboard.prosthetists.modal.create}
        </h3>
        
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">{texts.dashboard.prosthetists.modal.form.name.label}</span>
              </label>
              <input
                type="text"
                {...register("name", { required: texts.dashboard.prosthetists.modal.form.name.required })}
                className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
                placeholder={texts.dashboard.prosthetists.modal.form.name.placeholder}
              />
              {errors.name && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.name.message}</span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">{texts.dashboard.prosthetists.modal.form.type.label}</span>
              </label>
              <select
                {...register("type", { required: texts.dashboard.prosthetists.modal.form.type.required })}
                className={`select select-bordered w-full ${errors.type ? 'select-error' : ''}`}
              >
                <option value="External">External</option>
                <option value="Internal">Internal</option>
              </select>
              {errors.type && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.type.message}</span>
                </label>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">{texts.dashboard.prosthetists.modal.form.subtype.label}</span>
              </label>
              <select
                {...register("subtype", { required: texts.dashboard.prosthetists.modal.form.subtype.required })}
                className={`select select-bordered w-full ${errors.subtype ? 'select-error' : ''}`}
              >
                {selectedType === 'External' ? (
                  <>
                    <option value="Laboratory">Laboratory</option>
                    <option value="Freelance">Freelance</option>
                  </>
                ) : (
                  <option value="Internal">Internal</option>
                )}
              </select>
              {errors.subtype && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.subtype.message}</span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  {selectedType === 'External' && watch('subtype') === 'Laboratory' 
                    ? texts.dashboard.prosthetists.modal.form.cnpj.label
                    : texts.dashboard.prosthetists.modal.form.cpf.label}
                </span>
              </label>
              <input
                type="text"
                {...register(selectedType === 'External' && watch('subtype') === 'Laboratory' ? "cnpj" : "cpf", {
                  pattern: {
                    value: selectedType === 'External' && watch('subtype') === 'Laboratory' 
                      ? /^\d{14}$/ 
                      : /^\d{11}$/,
                    message: selectedType === 'External' && watch('subtype') === 'Laboratory'
                      ? texts.dashboard.prosthetists.modal.form.cnpj.invalid
                      : texts.dashboard.prosthetists.modal.form.cpf.invalid
                  }
                })}
                className={`input input-bordered w-full ${
                  (selectedType === 'External' && watch('subtype') === 'Laboratory' ? errors.cnpj : errors.cpf) 
                    ? 'input-error' 
                    : ''
                }`}
                placeholder={
                  selectedType === 'External' && watch('subtype') === 'Laboratory'
                    ? texts.dashboard.prosthetists.modal.form.cnpj.placeholder
                    : texts.dashboard.prosthetists.modal.form.cpf.placeholder
                }
              />
              {((selectedType === 'External' && watch('subtype') === 'Laboratory' ? errors.cnpj : errors.cpf)) && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {selectedType === 'External' && watch('subtype') === 'Laboratory'
                      ? errors.cnpj?.message
                      : errors.cpf?.message}
                  </span>
                </label>
              )}
            </div>
          </div>

          <div className="modal-action">
            <button type="button" className="btn rounded-xl" onClick={onClose}>
              {texts.dashboard.prosthetists.modal.buttons.cancel}
            </button>
            <button type="submit" className="btn btn-primary rounded-xl">
              {texts.dashboard.prosthetists.modal.buttons.save}
            </button>
          </div>
        </form>
      </div>
      <div className="modal-backdrop bg-base-200 bg-opacity-50" onClick={onClose} />
    </dialog>
  );
};