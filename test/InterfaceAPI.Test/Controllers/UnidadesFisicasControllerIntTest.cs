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
    public class UnidadesFisicasControllerIntTest
    {
        public UnidadesFisicasControllerIntTest()
        {
            _factory = new AppWebApplicationFactory<TestStartup>().WithMockUser();
            _client = _factory.CreateClient();

            _unidadesFisicasRepository = _factory.GetRequiredService<IUnidadesFisicasRepository>();

            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new AutoMapperProfile());
            });
            _mapper = config.CreateMapper();

            InitTest();
        }

        private const string DefaultUnidadefisica = "AAAAAAAAAA";
        private const string UpdatedUnidadefisica = "BBBBBBBBBB";

        private const string DefaultUnidadefisicafolha = "AAAAAAAAAA";
        private const string UpdatedUnidadefisicafolha = "BBBBBBBBBB";

        private const string DefaultNome = "AAAAAAAAAA";
        private const string UpdatedNome = "BBBBBBBBBB";

        private const string DefaultCnpj = "AAAAAAAAAA";
        private const string UpdatedCnpj = "BBBBBBBBBB";

        private const string DefaultSituacao = "AAAAAAAAAA";
        private const string UpdatedSituacao = "BBBBBBBBBB";

        private static readonly DateTime? DefaultDtatualizacao = DateTime.UnixEpoch;
        private static readonly DateTime? UpdatedDtatualizacao = DateTime.Now;

        private readonly AppWebApplicationFactory<TestStartup> _factory;
        private readonly HttpClient _client;
        private readonly IUnidadesFisicasRepository _unidadesFisicasRepository;

        private UnidadesFisicas _unidadesFisicas;

        private readonly IMapper _mapper;

        private UnidadesFisicas CreateEntity()
        {
            return new UnidadesFisicas
            {
                Unidadefisica = DefaultUnidadefisica,
                Unidadefisicafolha = DefaultUnidadefisicafolha,
                Nome = DefaultNome,
                Cnpj = DefaultCnpj,
                Situacao = DefaultSituacao,
                Dtatualizacao = DefaultDtatualizacao,
            };
        }

        private void InitTest()
        {
            _unidadesFisicas = CreateEntity();
        }

        [Fact]
        public async Task CreateUnidadesFisicas()
        {
            var databaseSizeBeforeCreate = await _unidadesFisicasRepository.CountAsync();

            // Create the UnidadesFisicas
            UnidadesFisicasDto _unidadesFisicasDto = _mapper.Map<UnidadesFisicasDto>(_unidadesFisicas);
            var response = await _client.PostAsync("/api/unidades-fisicas", TestUtil.ToJsonContent(_unidadesFisicasDto));
            response.StatusCode.Should().Be(HttpStatusCode.Created);

            // Validate the UnidadesFisicas in the database
            var unidadesFisicasList = await _unidadesFisicasRepository.GetAllAsync();
            unidadesFisicasList.Count().Should().Be(databaseSizeBeforeCreate + 1);
            var testUnidadesFisicas = unidadesFisicasList.Last();
            testUnidadesFisicas.Unidadefisica.Should().Be(DefaultUnidadefisica);
            testUnidadesFisicas.Unidadefisicafolha.Should().Be(DefaultUnidadefisicafolha);
            testUnidadesFisicas.Nome.Should().Be(DefaultNome);
            testUnidadesFisicas.Cnpj.Should().Be(DefaultCnpj);
            testUnidadesFisicas.Situacao.Should().Be(DefaultSituacao);
            testUnidadesFisicas.Dtatualizacao.Should().Be(DefaultDtatualizacao);
        }

        [Fact]
        public async Task CreateUnidadesFisicasWithExistingId()
        {
            var databaseSizeBeforeCreate = await _unidadesFisicasRepository.CountAsync();
            // Create the UnidadesFisicas with an existing ID
            _unidadesFisicas.Id = 1L;

            // An entity with an existing ID cannot be created, so this API call must fail
            UnidadesFisicasDto _unidadesFisicasDto = _mapper.Map<UnidadesFisicasDto>(_unidadesFisicas);
            var response = await _client.PostAsync("/api/unidades-fisicas", TestUtil.ToJsonContent(_unidadesFisicasDto));

            // Validate the UnidadesFisicas in the database
            var unidadesFisicasList = await _unidadesFisicasRepository.GetAllAsync();
            unidadesFisicasList.Count().Should().Be(databaseSizeBeforeCreate);
        }

        [Fact]
        public async Task CheckUnidadefisicaIsRequired()
        {
            var databaseSizeBeforeTest = await _unidadesFisicasRepository.CountAsync();

            // Set the field to null
            _unidadesFisicas.Unidadefisica = null;

            // Create the UnidadesFisicas, which fails.
            UnidadesFisicasDto _unidadesFisicasDto = _mapper.Map<UnidadesFisicasDto>(_unidadesFisicas);
            var response = await _client.PostAsync("/api/unidades-fisicas", TestUtil.ToJsonContent(_unidadesFisicasDto));
            response.StatusCode.Should().Be(HttpStatusCode.BadRequest);

            var unidadesFisicasList = await _unidadesFisicasRepository.GetAllAsync();
            unidadesFisicasList.Count().Should().Be(databaseSizeBeforeTest);
        }

        [Fact]
        public async Task GetAllUnidadesFisicas()
        {
            // Initialize the database
            await _unidadesFisicasRepository.CreateOrUpdateAsync(_unidadesFisicas);
            await _unidadesFisicasRepository.SaveChangesAsync();

            // Get all the unidadesFisicasList
            var response = await _client.GetAsync("/api/unidades-fisicas?sort=id,desc");
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            var json = JToken.Parse(await response.Content.ReadAsStringAsync());
            json.SelectTokens("$.[*].id").Should().Contain(_unidadesFisicas.Id);
            json.SelectTokens("$.[*].unidadefisica").Should().Contain(DefaultUnidadefisica);
            json.SelectTokens("$.[*].unidadefisicafolha").Should().Contain(DefaultUnidadefisicafolha);
            json.SelectTokens("$.[*].nome").Should().Contain(DefaultNome);
            json.SelectTokens("$.[*].cnpj").Should().Contain(DefaultCnpj);
            json.SelectTokens("$.[*].situacao").Should().Contain(DefaultSituacao);
            json.SelectTokens("$.[*].dtatualizacao").Should().Contain(DefaultDtatualizacao);
        }

        [Fact]
        public async Task GetUnidadesFisicas()
        {
            // Initialize the database
            await _unidadesFisicasRepository.CreateOrUpdateAsync(_unidadesFisicas);
            await _unidadesFisicasRepository.SaveChangesAsync();

            // Get the unidadesFisicas
            var response = await _client.GetAsync($"/api/unidades-fisicas/{_unidadesFisicas.Id}");
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            var json = JToken.Parse(await response.Content.ReadAsStringAsync());
            json.SelectTokens("$.id").Should().Contain(_unidadesFisicas.Id);
            json.SelectTokens("$.unidadefisica").Should().Contain(DefaultUnidadefisica);
            json.SelectTokens("$.unidadefisicafolha").Should().Contain(DefaultUnidadefisicafolha);
            json.SelectTokens("$.nome").Should().Contain(DefaultNome);
            json.SelectTokens("$.cnpj").Should().Contain(DefaultCnpj);
            json.SelectTokens("$.situacao").Should().Contain(DefaultSituacao);
            json.SelectTokens("$.dtatualizacao").Should().Contain(DefaultDtatualizacao);
        }

        [Fact]
        public async Task GetNonExistingUnidadesFisicas()
        {
            var maxValue = long.MaxValue;
            var response = await _client.GetAsync("/api/unidades-fisicas/" + maxValue);
            response.StatusCode.Should().Be(HttpStatusCode.NotFound);
        }

        [Fact]
        public async Task UpdateUnidadesFisicas()
        {
            // Initialize the database
            await _unidadesFisicasRepository.CreateOrUpdateAsync(_unidadesFisicas);
            await _unidadesFisicasRepository.SaveChangesAsync();
            var databaseSizeBeforeUpdate = await _unidadesFisicasRepository.CountAsync();

            // Update the unidadesFisicas
            var updatedUnidadesFisicas = await _unidadesFisicasRepository.QueryHelper().GetOneAsync(it => it.Id == _unidadesFisicas.Id);
            // Disconnect from session so that the updates on updatedUnidadesFisicas are not directly saved in db
            //TODO detach
            updatedUnidadesFisicas.Unidadefisica = UpdatedUnidadefisica;
            updatedUnidadesFisicas.Unidadefisicafolha = UpdatedUnidadefisicafolha;
            updatedUnidadesFisicas.Nome = UpdatedNome;
            updatedUnidadesFisicas.Cnpj = UpdatedCnpj;
            updatedUnidadesFisicas.Situacao = UpdatedSituacao;
            updatedUnidadesFisicas.Dtatualizacao = UpdatedDtatualizacao;

            UnidadesFisicasDto updatedUnidadesFisicasDto = _mapper.Map<UnidadesFisicasDto>(updatedUnidadesFisicas);
            var response = await _client.PutAsync($"/api/unidades-fisicas/{_unidadesFisicas.Id}", TestUtil.ToJsonContent(updatedUnidadesFisicasDto));
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            // Validate the UnidadesFisicas in the database
            var unidadesFisicasList = await _unidadesFisicasRepository.GetAllAsync();
            unidadesFisicasList.Count().Should().Be(databaseSizeBeforeUpdate);
            var testUnidadesFisicas = unidadesFisicasList.Last();
            testUnidadesFisicas.Unidadefisica.Should().Be(UpdatedUnidadefisica);
            testUnidadesFisicas.Unidadefisicafolha.Should().Be(UpdatedUnidadefisicafolha);
            testUnidadesFisicas.Nome.Should().Be(UpdatedNome);
            testUnidadesFisicas.Cnpj.Should().Be(UpdatedCnpj);
            testUnidadesFisicas.Situacao.Should().Be(UpdatedSituacao);
            testUnidadesFisicas.Dtatualizacao.Should().Be(UpdatedDtatualizacao);
        }

        [Fact]
        public async Task UpdateNonExistingUnidadesFisicas()
        {
            var databaseSizeBeforeUpdate = await _unidadesFisicasRepository.CountAsync();

            // If the entity doesn't have an ID, it will throw BadRequestAlertException
            UnidadesFisicasDto _unidadesFisicasDto = _mapper.Map<UnidadesFisicasDto>(_unidadesFisicas);
            var response = await _client.PutAsync("/api/unidades-fisicas/1", TestUtil.ToJsonContent(_unidadesFisicasDto));
            response.StatusCode.Should().Be(HttpStatusCode.BadRequest);

            // Validate the UnidadesFisicas in the database
            var unidadesFisicasList = await _unidadesFisicasRepository.GetAllAsync();
            unidadesFisicasList.Count().Should().Be(databaseSizeBeforeUpdate);
        }

        [Fact]
        public async Task DeleteUnidadesFisicas()
        {
            // Initialize the database
            await _unidadesFisicasRepository.CreateOrUpdateAsync(_unidadesFisicas);
            await _unidadesFisicasRepository.SaveChangesAsync();
            var databaseSizeBeforeDelete = await _unidadesFisicasRepository.CountAsync();

            var response = await _client.DeleteAsync($"/api/unidades-fisicas/{_unidadesFisicas.Id}");
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            // Validate the database is empty
            var unidadesFisicasList = await _unidadesFisicasRepository.GetAllAsync();
            unidadesFisicasList.Count().Should().Be(databaseSizeBeforeDelete - 1);
        }

        [Fact]
        public void EqualsVerifier()
        {
            TestUtil.EqualsVerifier(typeof(UnidadesFisicas));
            var unidadesFisicas1 = new UnidadesFisicas
            {
                Id = 1L
            };
            var unidadesFisicas2 = new UnidadesFisicas
            {
                Id = unidadesFisicas1.Id
            };
            unidadesFisicas1.Should().Be(unidadesFisicas2);
            unidadesFisicas2.Id = 2L;
            unidadesFisicas1.Should().NotBe(unidadesFisicas2);
            unidadesFisicas1.Id = 0;
            unidadesFisicas1.Should().NotBe(unidadesFisicas2);
        }
    }
}
