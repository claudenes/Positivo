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
    public class NiveisEnsinosControllerIntTest
    {
        public NiveisEnsinosControllerIntTest()
        {
            _factory = new AppWebApplicationFactory<TestStartup>().WithMockUser();
            _client = _factory.CreateClient();

            _niveisEnsinoRepository = _factory.GetRequiredService<INiveisEnsinoRepository>();

            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new AutoMapperProfile());
            });
            _mapper = config.CreateMapper();

            InitTest();
        }

        private const string DefaultNivelensino = "AAAAAAAAAA";
        private const string UpdatedNivelensino = "BBBBBBBBBB";

        private const string DefaultNome = "AAAAAAAAAA";
        private const string UpdatedNome = "BBBBBBBBBB";

        private const string DefaultUnidaderesponsavel = "AAAAAAAAAA";
        private const string UpdatedUnidaderesponsavel = "BBBBBBBBBB";

        private const string DefaultSituacao = "AAAAAAAAAA";
        private const string UpdatedSituacao = "BBBBBBBBBB";

        private static readonly DateTime? DefaultDtatualizacao = DateTime.UnixEpoch;
        private static readonly DateTime? UpdatedDtatualizacao = DateTime.Now;

        private readonly AppWebApplicationFactory<TestStartup> _factory;
        private readonly HttpClient _client;
        private readonly INiveisEnsinoRepository _niveisEnsinoRepository;

        private NiveisEnsino _niveisEnsino;

        private readonly IMapper _mapper;

        private NiveisEnsino CreateEntity()
        {
            return new NiveisEnsino
            {
                Nivelensino = DefaultNivelensino,
                Nome = DefaultNome,
                Unidaderesponsavel = DefaultUnidaderesponsavel,
                Situacao = DefaultSituacao,
                Dtatualizacao = DefaultDtatualizacao,
            };
        }

        private void InitTest()
        {
            _niveisEnsino = CreateEntity();
        }

        [Fact]
        public async Task CreateNiveisEnsino()
        {
            var databaseSizeBeforeCreate = await _niveisEnsinoRepository.CountAsync();

            // Create the NiveisEnsino
            NiveisEnsinoDto _niveisEnsinoDto = _mapper.Map<NiveisEnsinoDto>(_niveisEnsino);
            var response = await _client.PostAsync("/api/niveis-ensinos", TestUtil.ToJsonContent(_niveisEnsinoDto));
            response.StatusCode.Should().Be(HttpStatusCode.Created);

            // Validate the NiveisEnsino in the database
            var niveisEnsinoList = await _niveisEnsinoRepository.GetAllAsync();
            niveisEnsinoList.Count().Should().Be(databaseSizeBeforeCreate + 1);
            var testNiveisEnsino = niveisEnsinoList.Last();
            testNiveisEnsino.Nivelensino.Should().Be(DefaultNivelensino);
            testNiveisEnsino.Nome.Should().Be(DefaultNome);
            testNiveisEnsino.Unidaderesponsavel.Should().Be(DefaultUnidaderesponsavel);
            testNiveisEnsino.Situacao.Should().Be(DefaultSituacao);
            testNiveisEnsino.Dtatualizacao.Should().Be(DefaultDtatualizacao);
        }

        [Fact]
        public async Task CreateNiveisEnsinoWithExistingId()
        {
            var databaseSizeBeforeCreate = await _niveisEnsinoRepository.CountAsync();
            // Create the NiveisEnsino with an existing ID
            _niveisEnsino.Id = 1L;

            // An entity with an existing ID cannot be created, so this API call must fail
            NiveisEnsinoDto _niveisEnsinoDto = _mapper.Map<NiveisEnsinoDto>(_niveisEnsino);
            var response = await _client.PostAsync("/api/niveis-ensinos", TestUtil.ToJsonContent(_niveisEnsinoDto));

            // Validate the NiveisEnsino in the database
            var niveisEnsinoList = await _niveisEnsinoRepository.GetAllAsync();
            niveisEnsinoList.Count().Should().Be(databaseSizeBeforeCreate);
        }

        [Fact]
        public async Task CheckNivelensinoIsRequired()
        {
            var databaseSizeBeforeTest = await _niveisEnsinoRepository.CountAsync();

            // Set the field to null
            _niveisEnsino.Nivelensino = null;

            // Create the NiveisEnsino, which fails.
            NiveisEnsinoDto _niveisEnsinoDto = _mapper.Map<NiveisEnsinoDto>(_niveisEnsino);
            var response = await _client.PostAsync("/api/niveis-ensinos", TestUtil.ToJsonContent(_niveisEnsinoDto));
            response.StatusCode.Should().Be(HttpStatusCode.BadRequest);

            var niveisEnsinoList = await _niveisEnsinoRepository.GetAllAsync();
            niveisEnsinoList.Count().Should().Be(databaseSizeBeforeTest);
        }

        [Fact]
        public async Task GetAllNiveisEnsinos()
        {
            // Initialize the database
            await _niveisEnsinoRepository.CreateOrUpdateAsync(_niveisEnsino);
            await _niveisEnsinoRepository.SaveChangesAsync();

            // Get all the niveisEnsinoList
            var response = await _client.GetAsync("/api/niveis-ensinos?sort=id,desc");
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            var json = JToken.Parse(await response.Content.ReadAsStringAsync());
            json.SelectTokens("$.[*].id").Should().Contain(_niveisEnsino.Id);
            json.SelectTokens("$.[*].nivelensino").Should().Contain(DefaultNivelensino);
            json.SelectTokens("$.[*].nome").Should().Contain(DefaultNome);
            json.SelectTokens("$.[*].unidaderesponsavel").Should().Contain(DefaultUnidaderesponsavel);
            json.SelectTokens("$.[*].situacao").Should().Contain(DefaultSituacao);
            json.SelectTokens("$.[*].dtatualizacao").Should().Contain(DefaultDtatualizacao);
        }

        [Fact]
        public async Task GetNiveisEnsino()
        {
            // Initialize the database
            await _niveisEnsinoRepository.CreateOrUpdateAsync(_niveisEnsino);
            await _niveisEnsinoRepository.SaveChangesAsync();

            // Get the niveisEnsino
            var response = await _client.GetAsync($"/api/niveis-ensinos/{_niveisEnsino.Id}");
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            var json = JToken.Parse(await response.Content.ReadAsStringAsync());
            json.SelectTokens("$.id").Should().Contain(_niveisEnsino.Id);
            json.SelectTokens("$.nivelensino").Should().Contain(DefaultNivelensino);
            json.SelectTokens("$.nome").Should().Contain(DefaultNome);
            json.SelectTokens("$.unidaderesponsavel").Should().Contain(DefaultUnidaderesponsavel);
            json.SelectTokens("$.situacao").Should().Contain(DefaultSituacao);
            json.SelectTokens("$.dtatualizacao").Should().Contain(DefaultDtatualizacao);
        }

        [Fact]
        public async Task GetNonExistingNiveisEnsino()
        {
            var maxValue = long.MaxValue;
            var response = await _client.GetAsync("/api/niveis-ensinos/" + maxValue);
            response.StatusCode.Should().Be(HttpStatusCode.NotFound);
        }

        [Fact]
        public async Task UpdateNiveisEnsino()
        {
            // Initialize the database
            await _niveisEnsinoRepository.CreateOrUpdateAsync(_niveisEnsino);
            await _niveisEnsinoRepository.SaveChangesAsync();
            var databaseSizeBeforeUpdate = await _niveisEnsinoRepository.CountAsync();

            // Update the niveisEnsino
            var updatedNiveisEnsino = await _niveisEnsinoRepository.QueryHelper().GetOneAsync(it => it.Id == _niveisEnsino.Id);
            // Disconnect from session so that the updates on updatedNiveisEnsino are not directly saved in db
            //TODO detach
            updatedNiveisEnsino.Nivelensino = UpdatedNivelensino;
            updatedNiveisEnsino.Nome = UpdatedNome;
            updatedNiveisEnsino.Unidaderesponsavel = UpdatedUnidaderesponsavel;
            updatedNiveisEnsino.Situacao = UpdatedSituacao;
            updatedNiveisEnsino.Dtatualizacao = UpdatedDtatualizacao;

            NiveisEnsinoDto updatedNiveisEnsinoDto = _mapper.Map<NiveisEnsinoDto>(updatedNiveisEnsino);
            var response = await _client.PutAsync($"/api/niveis-ensinos/{_niveisEnsino.Id}", TestUtil.ToJsonContent(updatedNiveisEnsinoDto));
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            // Validate the NiveisEnsino in the database
            var niveisEnsinoList = await _niveisEnsinoRepository.GetAllAsync();
            niveisEnsinoList.Count().Should().Be(databaseSizeBeforeUpdate);
            var testNiveisEnsino = niveisEnsinoList.Last();
            testNiveisEnsino.Nivelensino.Should().Be(UpdatedNivelensino);
            testNiveisEnsino.Nome.Should().Be(UpdatedNome);
            testNiveisEnsino.Unidaderesponsavel.Should().Be(UpdatedUnidaderesponsavel);
            testNiveisEnsino.Situacao.Should().Be(UpdatedSituacao);
            testNiveisEnsino.Dtatualizacao.Should().Be(UpdatedDtatualizacao);
        }

        [Fact]
        public async Task UpdateNonExistingNiveisEnsino()
        {
            var databaseSizeBeforeUpdate = await _niveisEnsinoRepository.CountAsync();

            // If the entity doesn't have an ID, it will throw BadRequestAlertException
            NiveisEnsinoDto _niveisEnsinoDto = _mapper.Map<NiveisEnsinoDto>(_niveisEnsino);
            var response = await _client.PutAsync("/api/niveis-ensinos/1", TestUtil.ToJsonContent(_niveisEnsinoDto));
            response.StatusCode.Should().Be(HttpStatusCode.BadRequest);

            // Validate the NiveisEnsino in the database
            var niveisEnsinoList = await _niveisEnsinoRepository.GetAllAsync();
            niveisEnsinoList.Count().Should().Be(databaseSizeBeforeUpdate);
        }

        [Fact]
        public async Task DeleteNiveisEnsino()
        {
            // Initialize the database
            await _niveisEnsinoRepository.CreateOrUpdateAsync(_niveisEnsino);
            await _niveisEnsinoRepository.SaveChangesAsync();
            var databaseSizeBeforeDelete = await _niveisEnsinoRepository.CountAsync();

            var response = await _client.DeleteAsync($"/api/niveis-ensinos/{_niveisEnsino.Id}");
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            // Validate the database is empty
            var niveisEnsinoList = await _niveisEnsinoRepository.GetAllAsync();
            niveisEnsinoList.Count().Should().Be(databaseSizeBeforeDelete - 1);
        }

        [Fact]
        public void EqualsVerifier()
        {
            TestUtil.EqualsVerifier(typeof(NiveisEnsino));
            var niveisEnsino1 = new NiveisEnsino
            {
                Id = 1L
            };
            var niveisEnsino2 = new NiveisEnsino
            {
                Id = niveisEnsino1.Id
            };
            niveisEnsino1.Should().Be(niveisEnsino2);
            niveisEnsino2.Id = 2L;
            niveisEnsino1.Should().NotBe(niveisEnsino2);
            niveisEnsino1.Id = 0;
            niveisEnsino1.Should().NotBe(niveisEnsino2);
        }
    }
}
