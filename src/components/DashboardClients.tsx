import { useState, useEffect, useCallback } from "react";
import { useTexts } from "../hooks/useTexts";
import { useClients } from "../hooks/useClients";
import { useAuth } from "../hooks/useAuth";
import { ClientModal } from "./ClientModal";
import { Client, CreateClientInput } from "../types/client";
import { toast } from "react-hot-toast";
import { UserAdd, Edit2, Trash } from "iconsax-react";
import debounce from "lodash/debounce";

export const DashboardClients = () => {
  const { texts } = useTexts();
  const { fetchClients, createClient, updateClient, deleteClient } = useClients();
  const { validateSession, resetAuth } = useAuth();
  
  const [clients, setClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const validateAndExecute = async (operation: () => Promise<any>) => {
    try {
      const isValid = await validateSession();
      if (!isValid) {
        toast.error("Sessão expirada. Por favor, faça login novamente.");
        await resetAuth();
        return false;
      }
      await operation();
      return true;
    } catch (error) {
      return false;
    }
  };

  // Fetch clients with debounced search
  const debouncedSearch = useCallback(
    debounce(async (search: string) => {
      setIsLoading(true);
      try {
        await validateAndExecute(async () => {
          const results = await fetchClients(search);
          setClients(results);
        });
      } finally {
        setIsLoading(false);
      }
    }, 300),
    []
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
    if (window.confirm('Tem certeza que deseja excluir este paciente?')) {
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

      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      <table className="table">
          <thead>
            <tr className="bg-primary">
              <th className="text-base-200">{texts.dashboard.clients.table.name}</th>
              <th className="text-base-200">{texts.dashboard.clients.table.cpf}</th>
              <th className="text-base-200">{texts.dashboard.clients.table.phone}</th>
              <th className="text-base-200">{texts.dashboard.clients.table.birth_date}</th>
              <th className="text-base-200">{texts.dashboard.clients.table.actions}</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="text-center">
                  <span className="loading loading-spinner loading-md"></span>
                </td>
              </tr>
            ) : clients.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center">
                  Nenhum paciente encontrado
                </td>
              </tr>
            ) : (
              clients.map((client) => (
                <tr key={client.id} className="hover:bg-base-200 transition-colors">
                  <td className="font-medium">{`${client.first_name} ${client.last_name}`}</td>
                  <td>{client.cpf_cnpj}</td>
                  <td>{client.phone}</td>
                  <td>{client.birth_date ? new Date(client.birth_date).toLocaleDateString() : '-'}</td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        className="btn btn-ghost btn-xs rounded-lg"
                        onClick={() => handleEdit(client)}
                      >
                        <Edit2 size={16} className="text-primary" />
                      </button>
                      <button
                        className="btn btn-ghost btn-xs rounded-lg"
                        onClick={() => handleDeleteClient(client)}
                      >
                        <Trash size={16} className="text-error" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ClientModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={selectedClient ? handleUpdateClient : handleCreateClient}
        client={selectedClient}
      />
    </div>
  );
};