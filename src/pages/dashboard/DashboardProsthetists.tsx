import { useState, useEffect, useCallback } from "react";
import { useTexts } from "../../hooks/useTexts";
import { useProsthetists } from "../../hooks/useProsthetists";
import { ProsthetistModal } from "../../components/ProsthetistModal";
import { Prosthetist } from "../../types/database";
import { CreateProsthetistInput } from "../../hooks/useProsthetists";
import { toast } from "react-hot-toast";
import { UserAdd, Edit2, Trash } from "iconsax-react";
import debounce from "lodash/debounce";
import { useNavigate } from "react-router-dom";

export const DashboardProsthetists = () => {
  const { texts } = useTexts();
  const { fetchProsthetists, createProsthetist, updateProsthetist, deleteProsthetist } = useProsthetists();
  const navigate = useNavigate();
  
  const [prosthetists, setProsthetists] = useState<Prosthetist[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProsthetist, setSelectedProsthetist] = useState<Prosthetist | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const handleSessionError = useCallback(() => {
    toast.error(texts.dashboard.prosthetists.notifications.createError);
    navigate('/login');
  }, [texts.dashboard.prosthetists.notifications.createError, navigate]);

  const debouncedSearch = useCallback((search: string) => {
    const searchFunc = async () => {
      setIsLoading(true);
      try {
        const results = await fetchProsthetists(search);
        setProsthetists(results);
      } catch {
        handleSessionError();
      } finally {
        setIsLoading(false);
      }
    };
    return debounce(searchFunc, 300);
  }, [fetchProsthetists, handleSessionError]);

  useEffect(() => {
    const search = debouncedSearch(searchTerm);
    search();
    return () => {
      search.cancel();
    };
  }, [searchTerm, debouncedSearch]);

  const handleCreateProsthetist = async (data: CreateProsthetistInput) => {
    try {
      await createProsthetist(data);
      toast.success(texts.dashboard.prosthetists.notifications.createSuccess);
      debouncedSearch(searchTerm)();
    } catch {
      toast.error(texts.dashboard.prosthetists.notifications.createError);
    }
  };

  const handleUpdateProsthetist = async (data: CreateProsthetistInput) => {
    if (!selectedProsthetist) return;
    
    try {
      await updateProsthetist({ id: selectedProsthetist.id, ...data });
      toast.success(texts.dashboard.prosthetists.notifications.updateSuccess);
      debouncedSearch(searchTerm)();
      setSelectedProsthetist(undefined);
    } catch {
      toast.error(texts.dashboard.prosthetists.notifications.updateError);
    }
  };

  const handleDeleteProsthetist = async (prosthetist: Prosthetist) => {
    if (window.confirm(texts.dashboard.prosthetists.notifications.deleteConfirm)) {
      try {
        await deleteProsthetist(prosthetist.id);
        toast.success(texts.dashboard.prosthetists.notifications.deleteSuccess);
        debouncedSearch(searchTerm)();
      } catch {
        toast.error(texts.dashboard.prosthetists.notifications.deleteError);
      }
    }
  };

  const handleEdit = (prosthetist: Prosthetist) => {
    setSelectedProsthetist(prosthetist);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProsthetist(undefined);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary">
          {texts.dashboard.prosthetists.title}
        </h1>
        <button 
          className="btn btn-primary gap-2 rounded-xl"
          onClick={() => setIsModalOpen(true)}
        >
          <UserAdd size={20} />
          {texts.dashboard.prosthetists.modal.create}
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder={texts.dashboard.prosthetists.search.placeholder}
          className="input input-bordered w-full max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="w-full flex justify-center">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      ) : prosthetists.length > 0 ? (
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table w-full">
            <thead>
              <tr>
                <th>{texts.dashboard.prosthetists.table.name}</th>
                <th>{texts.dashboard.prosthetists.table.type}</th>
                <th>{texts.dashboard.prosthetists.table.subtype}</th>
                <th>{texts.dashboard.prosthetists.table.document}</th>
                <th>{texts.dashboard.prosthetists.table.actions}</th>
              </tr>
            </thead>
            <tbody>
              {prosthetists.map((prosthetist) => (
                <tr key={prosthetist.id}>
                  <td>{prosthetist.name}</td>
                  <td>{prosthetist.type}</td>
                  <td>{prosthetist.subtype}</td>
                  <td>{prosthetist.cnpj || prosthetist.cpf || '-'}</td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => handleEdit(prosthetist)}
                      >
                        <Edit2 size={20} />
                      </button>
                      <button
                        className="btn btn-ghost btn-sm text-error"
                        onClick={() => handleDeleteProsthetist(prosthetist)}
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
          {texts.dashboard.prosthetists.search.noResults}
        </div>
      )}

      <ProsthetistModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={selectedProsthetist ? handleUpdateProsthetist : handleCreateProsthetist}
        prosthetist={selectedProsthetist}
      />
    </div>
  );
};