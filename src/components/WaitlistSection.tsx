import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { 
  MessageText1, 
  Mobile, 
  Buildings2, 
  LocationTick,
  TickSquare
} from "iconsax-react";
import { useTexts } from '../hooks/useTexts';

interface WaitlistForm {
  name: string;
  email: string;
  whatsapp: string;
  clinicCount: string;
  state: string;
}

const FormField = ({ 
  icon: Icon, 
  label, 
  error, 
  children 
}: { 
  icon: React.ElementType; 
  label: string; 
  error?: string;
  children: React.ReactNode;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="form-control"
  >
    <label className="label">
      <span className="label-text flex items-center gap-2 text-base">
        <Icon variant="Bold" size={20} className="text-primary" />
        {label}
      </span>
    </label>
    {children}
    {error && (
      <label className="label">
        <span className="label-text-alt text-error flex items-center gap-1 text-sm">
          <motion.span
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
          >
            ⚠️
          </motion.span>
          {error}
        </span>
      </label>
    )}
  </motion.div>
);

export const WaitlistSection = () => {
  const texts = useTexts();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<WaitlistForm>();

  const onSubmit = async (data: WaitlistForm) => {
    // TODO: Implement form submission
    console.log(data);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
  };

  return (
    <section id="waitlist" className="relative min-h-screen bg-base-100 py-32">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 -right-48 w-[600px] h-[600px] bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-24 -left-48 w-[600px] h-[600px] bg-gradient-to-br from-secondary/5 to-transparent rounded-full blur-3xl"
        />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="px-6 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 inline-block">
                Lista VIP
              </span>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-primary via-primary-focus to-secondary bg-clip-text text-transparent">
                  {texts.waitlist.title}
                </span>
              </h2>

              <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
                {texts.waitlist.subtitle}
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Card glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-[32px] blur-xl opacity-50" />
            
            <div className="card bg-base-200 shadow-xl relative overflow-hidden rounded-[30px] backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-50" />
              
              <div className="card-body p-8 relative">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <FormField 
                    icon={MessageText1} 
                    label={texts.waitlist.form.name.label}
                    error={errors.name?.message}
                  >
                    <input
                      type="text"
                      {...register("name", { required: texts.waitlist.form.name.required })}
                      className={`input input-bordered w-full transition-all duration-300 ${
                        errors.name ? 'input-error animate-shake' : 'focus:ring-2 focus:ring-primary/20'
                      }`}
                      placeholder={texts.waitlist.form.name.placeholder}
                    />
                  </FormField>

                  <FormField 
                    icon={MessageText1} 
                    label={texts.waitlist.form.email.label}
                    error={errors.email?.message}
                  >
                    <input
                      type="email"
                      {...register("email", { 
                        required: texts.waitlist.form.email.required,
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: texts.waitlist.form.email.invalid
                        }
                      })}
                      className={`input input-bordered w-full transition-all duration-300 ${
                        errors.email ? 'input-error animate-shake' : 'focus:ring-2 focus:ring-primary/20'
                      }`}
                      placeholder={texts.waitlist.form.email.placeholder}
                    />
                  </FormField>

                  <FormField 
                    icon={Mobile} 
                    label={texts.waitlist.form.whatsapp.label}
                    error={errors.whatsapp?.message}
                  >
                    <input
                      type="tel"
                      {...register("whatsapp", { 
                        required: texts.waitlist.form.whatsapp.required,
                        pattern: {
                          value: /^\d{11}$/,
                          message: texts.waitlist.form.whatsapp.invalid
                        }
                      })}
                      className={`input input-bordered w-full transition-all duration-300 ${
                        errors.whatsapp ? 'input-error animate-shake' : 'focus:ring-2 focus:ring-primary/20'
                      }`}
                      placeholder={texts.waitlist.form.whatsapp.placeholder}
                    />
                  </FormField>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField 
                      icon={Buildings2} 
                      label={texts.waitlist.form.clinicCount.label}
                      error={errors.clinicCount?.message}
                    >
                      <select 
                        {...register("clinicCount", { required: texts.waitlist.form.clinicCount.required })}
                        className={`select select-bordered w-full transition-all duration-300 ${
                          errors.clinicCount ? 'select-error animate-shake' : 'focus:ring-2 focus:ring-primary/20'
                        }`}
                      >
                        <option value="">{texts.waitlist.form.clinicCount.placeholder}</option>
                        {texts.waitlist.form.clinicCount.options.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </FormField>

                    <FormField 
                      icon={LocationTick} 
                      label={texts.waitlist.form.state.label}
                      error={errors.state?.message}
                    >
                      <select 
                        {...register("state", { required: texts.waitlist.form.state.required })}
                        className={`select select-bordered w-full transition-all duration-300 ${
                          errors.state ? 'select-error animate-shake' : 'focus:ring-2 focus:ring-primary/20'
                        }`}
                      >
                        <option value="">{texts.waitlist.form.state.placeholder}</option>
                        {texts.waitlist.states.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </FormField>
                  </div>

                  <motion.div 
                    className="form-control mt-8"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <button 
                      type="submit" 
                      className={`
                        btn btn-primary w-full h-16 text-lg rounded-2xl
                        ${isSubmitting ? 'loading' : ''}
                        transition-all duration-300
                        hover:shadow-lg hover:shadow-primary/20
                      `}
                      disabled={isSubmitting}
                    >
                      <span className="flex items-center gap-2">
                        {isSubmitting ? (
                          texts.waitlist.form.submitting
                        ) : (
                          <>
                            {texts.waitlist.form.submit}
                            <TickSquare variant="Bold" size={24} />
                          </>
                        )}
                      </span>
                    </button>
                  </motion.div>

                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-sm text-base-content/60 text-center mt-6"
                  >
                    {texts.waitlist.form.disclaimer}
                  </motion.p>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};