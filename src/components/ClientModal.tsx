import { useForm } from "react-hook-form";
import { useTexts } from "../hooks/useTexts";
import { Client, CreateClientInput } from "../types/client";
import { toast } from "react-hot-toast";

interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateClientInput) => Promise<void>;
  client?: Client;
}

export const ClientModal = ({ isOpen, onClose, onSubmit, client }: ClientModalProps) => {
  const { texts } = useTexts();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateClientInput>({
    defaultValues: client || {
      first_name: "",
      last_name: "",
      cpf_cnpj: "",
      phone: "",
      birth_date: "",
      address: ""
    }
  });

  const handleFormSubmit = async (data: CreateClientInput) => {
    try {
      await onSubmit(data);
      reset();
      onClose();
    } catch (error) {
      toast.error(texts.dashboard.clients.notifications.createError);
    }
  };

  return (
    <dialog className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box max-w-2xl">
        <h3 className="font-bold text-lg mb-6">
          {client ? texts.dashboard.clients.modal.edit : texts.dashboard.clients.modal.create}
        </h3>
        
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">{texts.dashboard.clients.modal.form.firstName.label}</span>
              </label>
              <input
                type="text"
                {...register("first_name", { required: texts.dashboard.clients.modal.form.firstName.required })}
                className={`input input-bordered w-full ${errors.first_name ? 'input-error' : ''}`}
                placeholder={texts.dashboard.clients.modal.form.firstName.placeholder}
              />
              {errors.first_name && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.first_name.message}</span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">{texts.dashboard.clients.modal.form.lastName.label}</span>
              </label>
              <input
                type="text"
                {...register("last_name", { required: texts.dashboard.clients.modal.form.lastName.required })}
                className={`input input-bordered w-full ${errors.last_name ? 'input-error' : ''}`}
                placeholder={texts.dashboard.clients.modal.form.lastName.placeholder}
              />
              {errors.last_name && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.last_name.message}</span>
                </label>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">{texts.dashboard.clients.modal.form.cpf.label}</span>
              </label>
              <input
                type="text"
                {...register("cpf_cnpj", { 
                  required: texts.dashboard.clients.modal.form.cpf.required,
                  pattern: {
                    value: /^\d{11}$/,
                    message: texts.dashboard.clients.modal.form.cpf.invalid
                  }
                })}
                className={`input input-bordered w-full ${errors.cpf_cnpj ? 'input-error' : ''}`}
                placeholder={texts.dashboard.clients.modal.form.cpf.placeholder}
              />
              {errors.cpf_cnpj && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.cpf_cnpj.message}</span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">{texts.dashboard.clients.modal.form.phone.label}</span>
              </label>
              <input
                type="tel"
                {...register("phone", { 
                  required: texts.dashboard.clients.modal.form.phone.required,
                  pattern: {
                    value: /^\d{11}$/,
                    message: texts.dashboard.clients.modal.form.phone.invalid
                  }
                })}
                className={`input input-bordered w-full ${errors.phone ? 'input-error' : ''}`}
                placeholder={texts.dashboard.clients.modal.form.phone.placeholder}
              />
              {errors.phone && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.phone.message}</span>
                </label>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">{texts.dashboard.clients.modal.form.birthDate.label}</span>
              </label>
              <input
                type="date"
                {...register("birth_date")}
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">{texts.dashboard.clients.modal.form.address.label}</span>
              </label>
              <input
                type="text"
                {...register("address")}
                className="input input-bordered w-full"
                placeholder={texts.dashboard.clients.modal.form.address.placeholder}
              />
            </div>
          </div>

          <div className="modal-action">
            <button type="button" className="btn rounded-full" onClick={onClose}>
              {texts.dashboard.clients.modal.buttons.cancel}
            </button>
            <button type="submit" className="btn btn-primary rounded-full">
              {texts.dashboard.clients.modal.buttons.save}
            </button>
          </div>
        </form>
      </div>
      <div className="modal-backdrop bg-base-200 bg-opacity-50" onClick={onClose} />
    </dialog>
  );
};