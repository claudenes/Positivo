using System;

using AutoMapper;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using FluentAssertions;
using Positivo.InterfaceAPI.Infrastructure.Data;
using Positivo.InterfaceAPI.Domain;
using Positivo.InterfaceAPI.Domain.Repositories.Interfaces;
using Positivo.InterfaceAPI.Dto;
using Positivo.InterfaceAPI.Configuration.AutoMapper;
using Positivo.InterfaceAPI.Test.Setup;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using Xunit;

namespace Positivo.InterfaceAPI.Test.Controllers
{
    public class InterfaceIntegracaosControllerIntTest
    {
        public InterfaceIntegracaosControllerIntTest()
        {
            _factory = new AppWebApplicationFactory<TestStartup>().WithMockUser();
            _client = _factory.CreateClient();

            _interfaceIntegracaoRepository = _factory.GetRequiredService<IInterfaceIntegracaoRepository>();

            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new AutoMapperProfile());
            });
            _mapper = config.CreateMapper();

            InitTest();
        }

        private const string DefaultNomeintegracao = "AAAAAAAAAA";
        private const string UpdatedNomeintegracao = "BBBBBBBBBB";

        private const string DefaultServidorondeestainstalado = "AAAAAAAAAA";
        private const string UpdatedServidorondeestainstalado = "BBBBBBBBBB";

        private const string DefaultUsuario = "AAAAAAAAAA";
        private const string UpdatedUsuario = "BBBBBBBBBB";

        private const string DefaultSenha = "AAAAAAAAAA";
        private const string UpdatedSenha = "BBBBBBBBBB";

        private const string DefaultStatus = "AAAAAAAAAA";
        private const string UpdatedStatus = "BBBBBBBBBB";

        private static readonly DateTime? DefaultDtatualizacao = DateTime.UnixEpoch;
        private static readonly DateTime? UpdatedDtatualizacao = DateTime.Now;

        private readonly AppWebApplicationFactory<TestStartup> _factory;
        private readonly HttpClient _client;
        private readonly IInterfaceIntegracaoRepository _interfaceIntegracaoRepository;

        private InterfaceIntegracao _interfaceIntegracao;

        private readonly IMapper _mapper;

        private InterfaceIntegracao CreateEntity()
        {
            return new InterfaceIntegracao
            {
                Nomeintegracao = DefaultNomeintegracao,
                Servidorondeestainstalado = DefaultServidorondeestainstalado,
                Usuario = DefaultUsuario,
                Senha = DefaultSenha,
                Status = DefaultStatus,
                Dtatualizacao = DefaultDtatualizacao,
            };
        }

        private void InitTest()
        {
            _interfaceIntegracao = CreateEntity();
        }

        [Fact]
        public async Task CreateInterfaceIntegracao()
        {
            var databaseSizeBeforeCreate = await _interfaceIntegracaoRepository.CountAsync();

            // Create the InterfaceIntegracao
            InterfaceIntegracaoDto _interfaceIntegracaoDto = _mapper.Map<InterfaceIntegracaoDto>(_interfaceIntegracao);
            var response = await _client.PostAsync("/api/interface-integracaos", TestUtil.ToJsonContent(_interfaceIntegracaoDto));
            response.StatusCode.Should().Be(HttpStatusCode.Created);

            // Validate the InterfaceIntegracao in the database
            var interfaceIntegracaoList = await _interfaceIntegracaoRepository.GetAllAsync();
            interfaceIntegracaoList.Count().Should().Be(databaseSizeBeforeCreate + 1);
            var testInterfaceIntegracao = interfaceIntegracaoList.Last();
            testInterfaceIntegracao.Nomeintegracao.Should().Be(DefaultNomeintegracao);
            testInterfaceIntegracao.Servidorondeestainstalado.Should().Be(DefaultServidorondeestainstalado);
            testInterfaceIntegracao.Usuario.Should().Be(DefaultUsuario);
            testInterfaceIntegracao.Senha.Should().Be(DefaultSenha);
            testInterfaceIntegracao.Status.Should().Be(DefaultStatus);
            testInterfaceIntegracao.Dtatualizacao.Should().Be(DefaultDtatualizacao);
        }

        [Fact]
        public async Task CreateInterfaceIntegracaoWithExistingId()
        {
            var databaseSizeBeforeCreate = await _interfaceIntegracaoRepository.CountAsync();
            // Create the InterfaceIntegracao with an existing ID
            _interfaceIntegracao.Id = 1L;

            // An entity with an existing ID cannot be created, so this API call must fail
            InterfaceIntegracaoDto _interfaceIntegracaoDto = _mapper.Map<InterfaceIntegracaoDto>(_interfaceIntegracao);
            var response = await _client.PostAsync("/api/interface-integracaos", TestUtil.ToJsonContent(_interfaceIntegracaoDto));

            // Validate the InterfaceIntegracao in the database
            var interfaceIntegracaoList = await _interfaceIntegracaoRepository.GetAllAsync();
            interfaceIntegracaoList.Count().Should().Be(databaseSizeBeforeCreate);
        }

        [Fact]
        public async Task GetAllInterfaceIntegracaos()
        {
            // Initialize the database
            await _interfaceIntegracaoRepository.CreateOrUpdateAsync(_interfaceIntegracao);
            await _interfaceIntegracaoRepository.SaveChangesAsync();

            // Get all the interfaceIntegracaoList
            var response = await _client.GetAsync("/api/interface-integracaos?sort=id,desc");
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            var json = JToken.Parse(await response.Content.ReadAsStringAsync());
            json.SelectTokens("$.[*].id").Should().Contain(_interfaceIntegracao.Id);
            json.SelectTokens("$.[*].nomeintegracao").Should().Contain(DefaultNomeintegracao);
            json.SelectTokens("$.[*].servidorondeestainstalado").Should().Contain(DefaultServidorondeestainstalado);
            json.SelectTokens("$.[*].usuario").Should().Contain(DefaultUsuario);
            json.SelectTokens("$.[*].senha").Should().Contain(DefaultSenha);
            json.SelectTokens("$.[*].status").Should().Contain(DefaultStatus);
            json.SelectTokens("$.[*].dtatualizacao").Should().Contain(DefaultDtatualizacao);
        }

        [Fact]
        public async Task GetInterfaceIntegracao()
        {
            // Initialize the database
            await _interfaceIntegracaoRepository.CreateOrUpdateAsync(_interfaceIntegracao);
            await _interfaceIntegracaoRepository.SaveChangesAsync();

            // Get the interfaceIntegracao
            var response = await _client.GetAsync($"/api/interface-integracaos/{_interfaceIntegracao.Id}");
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            var json = JToken.Parse(await response.Content.ReadAsStringAsync());
            json.SelectTokens("$.id").Should().Contain(_interfaceIntegracao.Id);
            json.SelectTokens("$.nomeintegracao").Should().Contain(DefaultNomeintegracao);
            json.SelectTokens("$.servidorondeestainstalado").Should().Contain(DefaultServidorondeestainstalado);
            json.SelectTokens("$.usuario").Should().Contain(DefaultUsuario);
            json.SelectTokens("$.senha").Should().Contain(DefaultSenha);
            json.SelectTokens("$.status").Should().Contain(DefaultStatus);
            json.SelectTokens("$.dtatualizacao").Should().Contain(DefaultDtatualizacao);
        }

        [Fact]
        public async Task GetNonExistingInterfaceIntegracao()
        {
            var maxValue = long.MaxValue;
            var response = await _client.GetAsync("/api/interface-integracaos/" + maxValue);
            response.StatusCode.Should().Be(HttpStatusCode.NotFound);
        }

        [Fact]
        public async Task UpdateInterfaceIntegracao()
        {
            // Initialize the database
            await _interfaceIntegracaoRepository.CreateOrUpdateAsync(_interfaceIntegracao);
            await _interfaceIntegracaoRepository.SaveChangesAsync();
            var databaseSizeBeforeUpdate = await _interfaceIntegracaoRepository.CountAsync();

            // Update the interfaceIntegracao
            var updatedInterfaceIntegracao = await _interfaceIntegracaoRepository.QueryHelper().GetOneAsync(it => it.Id == _interfaceIntegracao.Id);
            // Disconnect from session so that the updates on updatedInterfaceIntegracao are not directly saved in db
            //TODO detach
            updatedInterfaceIntegracao.Nomeintegracao = UpdatedNomeintegracao;
            updatedInterfaceIntegracao.Servidorondeestainstalado = UpdatedServidorondeestainstalado;
            updatedInterfaceIntegracao.Usuario = UpdatedUsuario;
            updatedInterfaceIntegracao.Senha = UpdatedSenha;
            updatedInterfaceIntegracao.Status = UpdatedStatus;
            updatedInterfaceIntegracao.Dtatualizacao = UpdatedDtatualizacao;

            InterfaceIntegracaoDto updatedInterfaceIntegracaoDto = _mapper.Map<InterfaceIntegracaoDto>(updatedInterfaceIntegracao);
            var response = await _client.PutAsync($"/api/interface-integracaos/{_interfaceIntegracao.Id}", TestUtil.ToJsonContent(updatedInterfaceIntegracaoDto));
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            // Validate the InterfaceIntegracao in the database
            var interfaceIntegracaoList = await _interfaceIntegracaoRepository.GetAllAsync();
            interfaceIntegracaoList.Count().Should().Be(databaseSizeBeforeUpdate);
            var testInterfaceIntegracao = interfaceIntegracaoList.Last();
            testInterfaceIntegracao.Nomeintegracao.Should().Be(UpdatedNomeintegracao);
            testInterfaceIntegracao.Servidorondeestainstalado.Should().Be(UpdatedServidorondeestainstalado);
            testInterfaceIntegracao.Usuario.Should().Be(UpdatedUsuario);
            testInterfaceIntegracao.Senha.Should().Be(UpdatedSenha);
            testInterfaceIntegracao.Status.Should().Be(UpdatedStatus);
            testInterfaceIntegracao.Dtatualizacao.Should().Be(UpdatedDtatualizacao);
        }

        [Fact]
        public async Task UpdateNonExistingInterfaceIntegracao()
        {
            var databaseSizeBeforeUpdate = await _interfaceIntegracaoRepository.CountAsync();

            // If the entity doesn't have an ID, it will throw BadRequestAlertException
            InterfaceIntegracaoDto _interfaceIntegracaoDto = _mapper.Map<InterfaceIntegracaoDto>(_interfaceIntegracao);
            var response = await _client.PutAsync("/api/interface-integracaos/1", TestUtil.ToJsonContent(_interfaceIntegracaoDto));
            response.StatusCode.Should().Be(HttpStatusCode.BadRequest);

            // Validate the InterfaceIntegracao in the database
            var interfaceIntegracaoList = await _interfaceIntegracaoRepository.GetAllAsync();
            interfaceIntegracaoList.Count().Should().Be(databaseSizeBeforeUpdate);
        }

        [Fact]
        public async Task DeleteInterfaceIntegracao()
        {
            // Initialize the database
            await _interfaceIntegracaoRepository.CreateOrUpdateAsync(_interfaceIntegracao);
            await _interfaceIntegracaoRepository.SaveChangesAsync();
            var databaseSizeBeforeDelete = await _interfaceIntegracaoRepository.CountAsync();

            var response = await _client.DeleteAsync($"/api/interface-integracaos/{_interfaceIntegracao.Id}");
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            // Validate the database is empty
            var interfaceIntegracaoList = await _interfaceIntegracaoRepository.GetAllAsync();
            interfaceIntegracaoList.Count().Should().Be(databaseSizeBeforeDelete - 1);
        }

        [Fact]
        public void EqualsVerifier()
        {
            TestUtil.EqualsVerifier(typeof(InterfaceIntegracao));
            var interfaceIntegracao1 = new InterfaceIntegracao
            {
                Id = 1L
            };
            var interfaceIntegracao2 = new InterfaceIntegracao
            {
                Id = interfaceIntegracao1.Id
            };
            interfaceIntegracao1.Should().Be(interfaceIntegracao2);
            interfaceIntegracao2.Id = 2L;
            interfaceIntegracao1.Should().NotBe(interfaceIntegracao2);
            interfaceIntegracao1.Id = 0;
            interfaceIntegracao1.Should().NotBe(interfaceIntegracao2);
        }
    }
}
