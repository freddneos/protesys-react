import { useState, useEffect, useCallback } from "react";
import { useTexts } from "../../hooks/useTexts";
import { useStages } from "../../hooks/useStages";
import { StageModal } from "../../components/StageModal";
import { Stage, CreateStageInput } from "../../types/database";
import { toast } from "react-hot-toast";
import { Add, Edit2, Trash } from "iconsax-react";
import debounce from "lodash/debounce";
import { useNavigate } from "react-router-dom";

export const DashboardStages = () => {
  const { texts } = useTexts();
  const { fetchStages, createStage, updateStage, deleteStage } = useStages();
  const navigate = useNavigate();
  
  const [stages, setStages] = useState<Stage[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStage, setSelectedStage] = useState<Stage | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const handleSessionError = useCallback(() => {
    toast.error(texts.dashboard.stages.notifications.createError);
    navigate('/login');
  }, [texts.dashboard.stages.notifications.createError, navigate]);

  const debouncedSearch = useCallback((search: string) => {
    const searchFunc = async () => {
      setIsLoading(true);
      try {
        const results = await fetchStages(search);
        setStages(results);
      } catch {
        handleSessionError();
      } finally {
        setIsLoading(false);
      }
    };
    return debounce(searchFunc, 300);
  }, [fetchStages, handleSessionError]);

  useEffect(() => {
    const search = debouncedSearch(searchTerm);
    search();
    return () => {
      search.cancel();
    };
  }, [searchTerm, debouncedSearch]);

  const handleCreateStage = async (data: CreateStageInput) => {
    try {
      await createStage(data);
      toast.success(texts.dashboard.stages.notifications.createSuccess);
      debouncedSearch(searchTerm)();
      setIsModalOpen(false);
    } catch {
      toast.error(texts.dashboard.stages.notifications.createError);
    }
  };

  const handleUpdateStage = async (data: CreateStageInput) => {
    if (!selectedStage) return;
    
    try {
      await updateStage({ id: selectedStage.id, ...data });
      toast.success(texts.dashboard.stages.notifications.updateSuccess);
      debouncedSearch(searchTerm)();
      setSelectedStage(undefined);
      setIsModalOpen(false);
    } catch {
      toast.error(texts.dashboard.stages.notifications.updateError);
    }
  };

  const handleDeleteStage = async (stage: Stage) => {
    if (window.confirm(texts.dashboard.stages.notifications.deleteConfirm)) {
      try {
        await deleteStage(stage.id);
        toast.success(texts.dashboard.stages.notifications.deleteSuccess);
        debouncedSearch(searchTerm)();
      } catch {
        toast.error(texts.dashboard.stages.notifications.deleteError);
      }
    }
  };

  const handleEdit = (stage: Stage) => {
    setSelectedStage(stage);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStage(undefined);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary">
          {texts.dashboard.stages.title}
        </h1>
        <button 
          className="btn btn-primary gap-2 rounded-xl"
          onClick={() => setIsModalOpen(true)}
        >
          <Add size={20} />
          {texts.dashboard.stages.modal.create}
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder={texts.dashboard.stages.search.placeholder}
          className="input input-bordered w-full max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="w-full flex justify-center">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      ) : stages.length > 0 ? (
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table w-full">
            <thead>
              <tr>
                <th>{texts.dashboard.stages.table.name}</th>
                <th>{texts.dashboard.stages.table.description}</th>
                <th>{texts.dashboard.stages.table.minDays}</th>
                <th>{texts.dashboard.stages.table.maxDays}</th>
                <th>{texts.dashboard.stages.table.color}</th>
                <th>{texts.dashboard.stages.table.actions}</th>
              </tr>
            </thead>
            <tbody>
              {stages.map((stage) => (
                <tr key={stage.id}>
                  <td>{stage.name}</td>
                  <td>{stage.description || '-'}</td>
                  <td>{stage.min_days}</td>
                  <td>{stage.max_days}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-6 h-6 rounded-full" 
                        style={{ backgroundColor: stage.color || '#000000' }}
                      />
                      {stage.color || '-'}
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => handleEdit(stage)}
                      >
                        <Edit2 size={20} />
                      </button>
                      <button
                        className="btn btn-ghost btn-sm text-error"
                        onClick={() => handleDeleteStage(stage)}
                      >
                        <Trash size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-gray-500">
          {texts.dashboard.stages.search.noResults}
        </div>
      )}

      <StageModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={selectedStage ? handleUpdateStage : handleCreateStage}
        stage={selectedStage}
      />
    </div>
  );
};