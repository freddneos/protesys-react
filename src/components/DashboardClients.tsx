import { useState, useEffect, useCallback } from "react";
import { useTexts } from "../hooks/useTexts";
import { useClients } from "../hooks/useClients";
import { useAuth } from "../hooks/useAuth";
import { ClientModal } from "./ClientModal";
import { Client, CreateClientInput } from "../types/client";
import { toast } from "react-hot-toast";
import { UserAdd, Edit2, Trash } from "iconsax-react";
import debounce from "lodash/debounce";
import { useNavigate } from "react-router-dom";

export const DashboardClients = () => {
  const { texts } = useTexts();
  const { fetchClients, createClient, updateClient, deleteClient } = useClients();
  const { validateSession, resetAuth } = useAuth();
  const navigate = useNavigate();
  
  const [clients, setClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const handleSessionError = useCallback(() => {
    toast.error(texts.dashboard.clients.notifications.sessionExpired);
    resetAuth();
    navigate('/login');
  }, [texts.dashboard.clients.notifications.sessionExpired, resetAuth, navigate]);

  const validateAndExecute = useCallback(async (operation: () => Promise<any>) => {
    try {
      const isValid = await validateSession();
      if (!isValid) {
        handleSessionError();
        return false;
      }
      await operation();
      return true;
    } catch (error) {
      return false;
    }
  }, [validateSession, handleSessionError]);

  // Fetch clients with debounced search - removed isLoading from dependencies
  const debouncedSearch = useCallback(
    debounce(async (search: string) => {
      setIsLoading(true);
      try {
        const results = await fetchClients(search);
        setClients(results);
      } catch (error) {
        handleSessionError();
      } finally {
        setIsLoading(false);
      }
    }, 300),
    [fetchClients, handleSessionError] // Removed isLoading dependency
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, debouncedSearch]);

  const handleCreateClient = async (data: CreateClientInput) => {
    try {
      await validateAndExecute(async () => {
        await createClient(data);
        toast.success(texts.dashboard.clients.notifications.createSuccess);
        debouncedSearch(searchTerm);
      });
    } catch (error) {
      toast.error(texts.dashboard.clients.notifications.createError);
    }
  };

  const handleUpdateClient = async (data: CreateClientInput) => {
    if (!selectedClient) return;
    
    try {
      await validateAndExecute(async () => {
        await updateClient({ id: selectedClient.id, ...data });
        toast.success(texts.dashboard.clients.notifications.updateSuccess);
        debouncedSearch(searchTerm);
        setSelectedClient(undefined);
      });
    } catch (error) {
      toast.error(texts.dashboard.clients.notifications.updateError);
    }
  };

  const handleDeleteClient = async (client: Client) => {
    if (window.confirm(texts.dashboard.clients.confirmDelete)) {
      try {
        await validateAndExecute(async () => {
          await deleteClient(client.id);
          toast.success(texts.dashboard.clients.notifications.deleteSuccess);
          debouncedSearch(searchTerm);
        });
      } catch (error) {
        toast.error(texts.dashboard.clients.notifications.deleteError);
      }
    }
  };

  const handleEdit = (client: Client) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedClient(undefined);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary">
          {texts.dashboard.clients.title}
        </h1>
        <button 
          className="btn btn-primary gap-2 rounded-full"
          onClick={() => setIsModalOpen(true)}
        >
          <UserAdd size={20} />
          {texts.dashboard.clients.modal.create}
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder={texts.dashboard.clients.search.placeholder}
          className="input input-bordered w-full max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="w-full flex justify-center">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      ) : clients.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>{texts.dashboard.clients.table.name}</th>
                <th>{texts.dashboard.clients.table.cpfCnpj}</th>
                <th>{texts.dashboard.clients.table.phone}</th>
                <th>{texts.dashboard.clients.table.birthDate}</th>
                <th>{texts.dashboard.clients.table.actions}</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id}>
                  <td>{`${client.first_name} ${client.last_name}`}</td>
                  <td>{client.cpf_cnpj}</td>
                  <td>{client.phone}</td>
                  <td>{new Date(client.birth_date).toLocaleDateString()}</td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => handleEdit(client)}
                      >
                        <Edit2 size={20} />
                      </button>
                      <button
                        className="btn btn-ghost btn-sm text-error"
                        onClick={() => handleDeleteClient(client)}
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
          {texts.dashboard.clients.noResults}
        </div>
      )}

      <ClientModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={selectedClient ? handleUpdateClient : handleCreateClient}
        client={selectedClient}
      />
    </div>
  );
};