import { useState, useEffect, useCallback } from "react";
import { useTexts } from "../hooks/useTexts";
import { useClients } from "../hooks/useClients";
import { ClientModal } from "./ClientModal";
import { Client, CreateClientInput } from "../types/client";
import { toast } from "react-hot-toast";
import { UserAdd, Edit2, Trash } from "iconsax-react";
import debounce from "lodash/debounce";

export const DashboardClients = () => {
  const { texts } = useTexts();
  const { fetchClients, createClient, updateClient, deleteClient } = useClients();
  
  const [clients, setClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  // Fetch clients with debounced search
  const debouncedSearch = useCallback(
    debounce(async (search: string) => {
      setIsLoading(true);
      const results = await fetchClients(search);
      setClients(results);
      setIsLoading(false);
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
      await createClient(data);
      toast.success(texts.dashboard.clients.notifications.createSuccess);
      debouncedSearch(searchTerm);
    } catch (error) {
      toast.error(texts.dashboard.clients.notifications.createError);
    }
  };

  const handleUpdateClient = async (data: CreateClientInput) => {
    if (!selectedClient) return;
    
    try {
      await updateClient({ id: selectedClient.id, ...data });
      toast.success(texts.dashboard.clients.notifications.updateSuccess);
      debouncedSearch(searchTerm);
      setSelectedClient(undefined);
    } catch (error) {
      toast.error(texts.dashboard.clients.notifications.updateError);
    }
  };

  const handleDeleteClient = async (client: Client) => {
    if (window.confirm('Tem certeza que deseja excluir este paciente?')) {
      try {
        await deleteClient(client.id);
        toast.success(texts.dashboard.clients.notifications.deleteSuccess);
        debouncedSearch(searchTerm);
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

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>{texts.dashboard.clients.table.name}</th>
              <th>{texts.dashboard.clients.table.cpf}</th>
              <th>{texts.dashboard.clients.table.phone}</th>
              <th>{texts.dashboard.clients.table.birth_date}</th>
              <th>{texts.dashboard.clients.table.actions}</th>
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
                <tr key={client.id}>
                  <td>{`${client.first_name} ${client.last_name}`}</td>
                  <td>{client.cpf_cnpj}</td>
                  <td>{client.phone}</td>
                  <td>{client.birth_date ? new Date(client.birth_date).toLocaleDateString() : '-'}</td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        className="btn btn-ghost btn-sm rounded-full"
                        onClick={() => handleEdit(client)}
                      >
                        <Edit2 size={18} className="text-primary" />
                      </button>
                      <button
                        className="btn btn-ghost btn-sm rounded-full"
                        onClick={() => handleDeleteClient(client)}
                      >
                        <Trash size={18} className="text-error" />
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