import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { 
  MessageText1, 
  Mobile, 
  Buildings2, 
  LocationTick 
} from "iconsax-react";

interface WaitlistForm {
  name: string;
  email: string;
  whatsapp: string;
  clinicCount: string;
  state: string;
}

const brazilianStates = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG",
  "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

export const WaitlistSection = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<WaitlistForm>();

  const onSubmit = async (data: WaitlistForm) => {
    // TODO: Implement form submission
    console.log(data);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
  };

  return (
    <section className="min-h-screen bg-base-100 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -right-48 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-48 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-20 min-h-screen flex flex-col justify-center">
        <div className="max-w-4xl mx-auto w-full relative">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Entre na Lista de Espera
              </span>
            </h2>
            <p className="text-xl text-base-content/70">
              Seja um dos primeiros a experimentar a revolução na gestão de clínicas odontológicas
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card bg-base-200 shadow-xl"
          >
            <div className="card-body p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text flex items-center gap-2">
                      <MessageText1 variant="Bold" size={20} className="text-primary" />
                      Nome Completo
                    </span>
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: "Nome é obrigatório" })}
                    className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
                    placeholder="Seu nome completo"
                  />
                  {errors.name && (
                    <label className="label">
                      <span className="label-text-alt text-error">{errors.name.message}</span>
                    </label>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text flex items-center gap-2">
                      <MessageText1 variant="Bold" size={20} className="text-primary" />
                      Email
                    </span>
                  </label>
                  <input
                    type="email"
                    {...register("email", { 
                      required: "Email é obrigatório",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Email inválido"
                      }
                    })}
                    className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
                    placeholder="seu@email.com"
                  />
                  {errors.email && (
                    <label className="label">
                      <span className="label-text-alt text-error">{errors.email.message}</span>
                    </label>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text flex items-center gap-2">
                      <Mobile variant="Bold" size={20} className="text-primary" />
                      WhatsApp
                    </span>
                  </label>
                  <input
                    type="tel"
                    {...register("whatsapp", { 
                      required: "WhatsApp é obrigatório",
                      pattern: {
                        value: /^\d{11}$/,
                        message: "Digite apenas números (DDD + número)"
                      }
                    })}
                    className={`input input-bordered w-full ${errors.whatsapp ? 'input-error' : ''}`}
                    placeholder="11999999999"
                  />
                  {errors.whatsapp && (
                    <label className="label">
                      <span className="label-text-alt text-error">{errors.whatsapp.message}</span>
                    </label>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text flex items-center gap-2">
                        <Buildings2 variant="Bold" size={20} className="text-primary" />
                        Número de Clínicas
                      </span>
                    </label>
                    <select 
                      {...register("clinicCount", { required: "Selecione o número de clínicas" })}
                      className={`select select-bordered w-full ${errors.clinicCount ? 'select-error' : ''}`}
                    >
                      <option value="">Selecione</option>
                      <option value="1">1 clínica</option>
                      <option value="2-5">2 a 5 clínicas</option>
                      <option value="6-10">6 a 10 clínicas</option>
                      <option value="10+">Mais de 10 clínicas</option>
                    </select>
                    {errors.clinicCount && (
                      <label className="label">
                        <span className="label-text-alt text-error">{errors.clinicCount.message}</span>
                      </label>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text flex items-center gap-2">
                        <LocationTick variant="Bold" size={20} className="text-primary" />
                        Estado
                      </span>
                    </label>
                    <select 
                      {...register("state", { required: "Selecione seu estado" })}
                      className={`select select-bordered w-full ${errors.state ? 'select-error' : ''}`}
                    >
                      <option value="">Selecione</option>
                      {brazilianStates.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                    {errors.state && (
                      <label className="label">
                        <span className="label-text-alt text-error">{errors.state.message}</span>
                      </label>
                    )}
                  </div>
                </div>

                <div className="form-control mt-6">
                  <button 
                    type="submit" 
                    className={`btn btn-primary w-full ${isSubmitting ? 'loading' : ''}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Enviando...' : 'Entrar para Lista de Espera'}
                  </button>
                </div>

                <p className="text-sm text-base-content/60 text-center mt-4">
                  Ao se inscrever, você será notificado sobre o lançamento da plataforma e terá acesso prioritário ao programa beta.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};