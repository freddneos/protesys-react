import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Stage, CreateStageInput } from '../types/database';
import { useTexts } from '../hooks/useTexts';
import { CloseCircle } from 'iconsax-react';

interface StageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateStageInput) => void;
  stage?: Stage;
}

export const StageModal = ({ isOpen, onClose, onSubmit, stage }: StageModalProps) => {
  const { texts } = useTexts();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateStageInput>();

  useEffect(() => {
    if (stage) {
      reset(stage);
    } else {
      reset({
        name: '',
        description: '',
        min_days: 1,
        max_days: 1,
        color: '#000000'
      });
    }
  }, [stage, reset]);

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box relative">
        <button
          className="btn btn-sm btn-circle absolute right-2 top-2"
          onClick={onClose}
        >
          <CloseCircle size={20} />
        </button>
        
        <h3 className="font-bold text-lg mb-4">
          {stage ? texts.dashboard.stages.modal.edit : texts.dashboard.stages.modal.create}
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">{texts.dashboard.stages.modal.form.name.label}</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder={texts.dashboard.stages.modal.form.name.placeholder}
              {...register('name', { required: texts.dashboard.stages.modal.form.name.required })}
            />
            {errors.name && (
              <span className="text-error text-sm mt-1">{errors.name.message}</span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">{texts.dashboard.stages.modal.form.description.label}</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder={texts.dashboard.stages.modal.form.description.placeholder}
              {...register('description')}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">{texts.dashboard.stages.modal.form.minDays.label}</span>
              </label>
              <input
                type="number"
                min="1"
                className="input input-bordered w-full"
                {...register('min_days', {
                  required: texts.dashboard.stages.modal.form.minDays.required,
                  min: { value: 1, message: texts.dashboard.stages.modal.form.minDays.min }
                })}
              />
              {errors.min_days && (
                <span className="text-error text-sm mt-1">{errors.min_days.message}</span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">{texts.dashboard.stages.modal.form.maxDays.label}</span>
              </label>
              <input
                type="number"
                min="1"
                className="input input-bordered w-full"
                {...register('max_days', {
                  required: texts.dashboard.stages.modal.form.maxDays.required,
                  min: { value: 1, message: texts.dashboard.stages.modal.form.maxDays.min }
                })}
              />
              {errors.max_days && (
                <span className="text-error text-sm mt-1">{errors.max_days.message}</span>
              )}
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">{texts.dashboard.stages.modal.form.color.label}</span>
            </label>
            <input
              type="color"
              className="input input-bordered w-full h-12"
              {...register('color')}
            />
          </div>

          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose}>
              {texts.dashboard.stages.modal.buttons.cancel}
            </button>
            <button type="submit" className="btn btn-primary">
              {texts.dashboard.stages.modal.buttons.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};